const fs = require('fs');
const path = require('path');

async function run() {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');

  // 1. Fetch external Webflow CSS
  const webflowCssUrl = 'https://cdn.prod.website-files.com/678fc13a6195245eefbb1f34/css/creative-giants-f70328.webflow.shared.d2ad5863f.min.css';
  let webflowCss = '';
  try {
    console.log('Fetching Webflow CSS...');
    const response = await fetch(webflowCssUrl);
    webflowCss = await response.text();
    console.log('Webflow CSS fetched successfully.');
  } catch (err) {
    console.error('Failed to fetch Webflow CSS, will look at step content file if possible...', err);
  }

  // 2. Extract internal styles
  const styles = [];
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let match;
  while ((match = styleRegex.exec(html)) !== null) {
    styles.push(match[1]);
  }
  const combinedCss = [webflowCss, ...styles].join('\n\n');

  // 3. Extract the body HTML
  const bodyMatch = /<body[^>]*>([\s\S]*?)<\/body>/i.exec(html);
  if (!bodyMatch) {
    throw new Error('No body tag found in index.html');
  }
  let bodyHtml = bodyMatch[1];

  // 4. Extract and analyze script tags inside body
  const scripts = [];
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  bodyHtml = bodyHtml.replace(scriptRegex, (m, content) => {
    if (content.trim()) {
      scripts.push(content.trim());
    }
    return ''; // Remove inline scripts from JSX structure
  });

  // Also remove script tags that load external libraries in body
  bodyHtml = bodyHtml.replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/gi, '');

  // 5. Convert HTML to JSX
  let jsx = bodyHtml;

  // Remove HTML comments
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');

  // Convert style tags inside body/JSX structure to use dangerouslySetInnerHTML to prevent compiler/parser errors
  jsx = jsx.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (match, styleContent) => {
    return `<style dangerouslySetInnerHTML={{ __html: ${JSON.stringify(styleContent)} }} />`;
  });

  // Convert class to className
  jsx = jsx.replace(/\bclass="/g, 'className="');
  jsx = jsx.replace(/\bclass='([^']*)'/g, 'className="$1"');

  // Convert for to htmlFor
  jsx = jsx.replace(/\bfor="/g, 'htmlFor="');
  jsx = jsx.replace(/\bfor='([^']*)'/g, 'htmlFor="$1"');

  // Convert other attributes to camelCase
  const attrMap = {
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule',
    'fill-opacity': 'fillOpacity',
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-miterlimit': 'strokeMiterlimit',
    'stroke-dasharray': 'strokeDasharray',
    'xml:space': 'xmlSpace',
    'viewbox': 'viewBox',
    'xmlns:xlink': 'xmlnsXlink',
    'xlink:href': 'xlinkHref',
    'autoplay': 'autoPlay',
    'playsinline': 'playsInline',
    'frameborder': 'frameBorder',
    'allowfullscreen': 'allowFullScreen',
    'webkitallowfullscreen': 'webkitAllowFullScreen',
    'mozallowfullscreen': 'mozAllowFullScreen',
    'charset': 'charSet',
    'crossorigin': 'crossOrigin',
    'maxlength': 'maxLength',
    'aria': 'aria-label',
    'srcset': 'srcSet',
    'tabindex': 'tabIndex'
  };

  for (const [key, value] of Object.entries(attrMap)) {
    const regex = new RegExp(`\\b${key}=`, 'gi');
    jsx = jsx.replace(regex, `${value}=`);
  }

  // Convert inline style strings to style objects
  // e.g. style="background-image:url(&quot;...&quot;)"
  jsx = jsx.replace(/style="([^"]*)"/g, (match, styleStr) => {
    // Unescape &quot;
    const cleanStyleStr = styleStr.replace(/&quot;/g, '"');
    const styleObj = {};
    cleanStyleStr.split(';').forEach(pair => {
      if (!pair.trim()) return;
      const colonIndex = pair.indexOf(':');
      if (colonIndex === -1) return;
      const key = pair.slice(0, colonIndex).trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
      const val = pair.slice(colonIndex + 1).trim();
      styleObj[key] = val;
    });
    return `style={${JSON.stringify(styleObj)}}`;
  });

  // Convert required="", disabled="", checked="", readonly="" to JSX booleans
  jsx = jsx.replace(/\brequired="[^"]*"/gi, 'required={true}');
  jsx = jsx.replace(/\bdisabled="[^"]*"/gi, 'disabled={true}');
  jsx = jsx.replace(/\breadOnly="[^"]*"/gi, 'readOnly={true}');
  jsx = jsx.replace(/\bmultiple="[^"]*"/gi, 'multiple={true}');
  jsx = jsx.replace(/\bchecked="[^"]*"/gi, 'checked={true}');
  jsx = jsx.replace(/\bautoPlay="[^"]*"/gi, 'autoPlay={true}');
  jsx = jsx.replace(/\bloop="[^"]*"/gi, 'loop={true}');
  jsx = jsx.replace(/\bmuted="[^"]*"/gi, 'muted={true}');
  jsx = jsx.replace(/\bplaysInline="[^"]*"/gi, 'playsInline={true}');
  jsx = jsx.replace(/\ballowFullScreen="[^"]*"/gi, 'allowFullScreen={true}');

  // Convert numeric string attributes to React numbers
  jsx = jsx.replace(/\bmaxLength="(\d+)"/gi, 'maxLength={$1}');
  jsx = jsx.replace(/\btabIndex="(\-?\d+)"/gi, 'tabIndex={$1}');

  // Remove invalid 'min' attribute from progress tags
  jsx = jsx.replace(/(<progress\b[^>]*)\bmin="[^"]*"/gi, '$1');

  // Convert custom invalid 'da' attribute to 'data-da'
  jsx = jsx.replace(/\bda="/gi, 'data-da="');

  // Fix SVG animateTransform tag casing
  jsx = jsx.replace(/<animatetransform\b/gi, '<animateTransform');
  jsx = jsx.replace(/<\/animatetransform>/gi, '</animateTransform>');

  // Convert href="..." on non-a, non-link, non-area, non-base elements to data-href="..."
  const nonHrefTags = '(?:div|button|span|p|h1|h2|h3|h4|h5|h6|input|section|header|footer|nav|ul|li|ol|iframe|video|img|svg|path|g|circle|rect|line|ellipse|polyline|polygon|text)';
  const hrefRegex = new RegExp(`(<${nonHrefTags}\\b[^>]*)\\bhref=`, 'gi');
  jsx = jsx.replace(hrefRegex, '$1data-href=');

  // Self-close void elements
  const voidElements = ['img', 'input', 'br', 'hr', 'source', 'link', 'meta'];
  voidElements.forEach(tag => {
    // Replace unclosed void elements
    // Match <tag attr1="val" attr2> that doesn't end with />
    const tagRegex = new RegExp(`<(${tag})(\\s[^>]*[^/])?>`, 'gi');
    jsx = jsx.replace(tagRegex, (m, tagName, attrs) => {
      return `<${tagName}${attrs || ''} />`;
    });
  });

  // Also replace any specific HTML characters/entities if needed
  jsx = jsx.replace(/&amp;/g, '&');
  jsx = jsx.replace(/&nbsp;/g, ' ');
  jsx = jsx.replace(/&quot;/g, '"');

  // Let's build the React component file content
  const componentContent = `// @ts-nocheck
"use client";

// npm install gsap @gsap/react lenis split-type jquery

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

export default function HeroImmersive() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Dynamically import client-side dependencies to prevent SSR build crashes
    const $ = require("jquery");
    const SplitType = require("split-type");
    const Lenis = require("lenis").default || require("lenis");

    // Declare interface addition for window
    const win = window as any;

    // --- LEGACY SCRIPTS FROM INDEX.HTML ---
    
    // Custom Ease Initialization
    CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
    gsap.defaults({
      ease: "main",
      duration: 0.9
    });

    // 1. Vimeo Player Logic
    function initVimeoPlayer() {
      if (!win.Vimeo) {
        const script = document.createElement("script");
        script.src = "https://player.vimeo.com/api/player.js";
        script.onload = () => setupVimeoPlayers();
        document.body.appendChild(script);
      } else {
        setupVimeoPlayers();
      }
    }

    function setupVimeoPlayers() {
      const vimeoPlayers = document.querySelectorAll('[data-vimeo-player-init]');
      vimeoPlayers.forEach(function(vimeoElement, index) {
        const vimeoVideoID = vimeoElement.getAttribute('data-vimeo-video-id');
        if (!vimeoVideoID) return;
        const vimeoVideoURL = \`https://player.vimeo.com/video/\${vimeoVideoID}?api=1&background=1&autoplay=0&loop=0&muted=1\`;
        vimeoElement.querySelector('iframe')?.setAttribute('src', vimeoVideoURL);

        const videoIndexID = 'vimeo-player-index-' + index;
        vimeoElement.setAttribute('id', videoIndexID);

        const player = new win.Vimeo.Player(videoIndexID);

        if (vimeoElement.getAttribute('data-vimeo-update-size') === 'true') {
          player.getVideoWidth().then(function(width: number) {
            player.getVideoHeight().then(function(height: number) {
              const beforeEl = vimeoElement.querySelector('.vimeo-player__before') as HTMLElement;
              if (beforeEl) {
                beforeEl.style.paddingTop = (height / width) * 100 + '%';
              }
            });
          });
        }

        player.on('play', function() {
          vimeoElement.setAttribute('data-vimeo-loaded', 'true');
        });

        const vimeoPlayerPlay = () => {
          vimeoElement.setAttribute('data-vimeo-activated', 'true');
          vimeoElement.setAttribute('data-vimeo-playing', 'true');
          player.play();
        };

        const vimeoPlayerPause = () => {
          vimeoElement.setAttribute('data-vimeo-playing', 'false');
          player.pause();
        };

        const checkVisibility = () => {
          const rect = vimeoElement.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          inView ? vimeoPlayerPlay() : vimeoPlayerPause();
        };

        if (vimeoElement.getAttribute('data-vimeo-autoplay') === 'false') {
          player.setVolume(1);
          player.pause();
        } else {
          player.setVolume(0);
          vimeoElement.setAttribute('data-vimeo-muted', 'true');

          if (vimeoElement.getAttribute('data-vimeo-paused-by-user') === 'false') {
            checkVisibility();
            window.addEventListener('scroll', checkVisibility);
          }
        }

        // Play/Pause/Mute controls
        vimeoElement.querySelector('[data-vimeo-control="play"]')?.addEventListener('click', function() {
          player.setVolume(0);
          vimeoPlayerPlay();
          if (vimeoElement.getAttribute('data-vimeo-muted') === 'true') {
            player.setVolume(0);
          } else {
            player.setVolume(1);
          }
        });

        vimeoElement.querySelector('[data-vimeo-control="pause"]')?.addEventListener('click', function() {
          vimeoPlayerPause();
          if (vimeoElement.getAttribute('data-vimeo-autoplay') === 'true') {
            vimeoElement.setAttribute('data-vimeo-paused-by-user', 'true');
            window.removeEventListener('scroll', checkVisibility);
          }
        });

        vimeoElement.querySelector('[data-vimeo-control="mute"]')?.addEventListener('click', function() {
          if (vimeoElement.getAttribute('data-vimeo-muted') === 'false') {
            player.setVolume(0);
            vimeoElement.setAttribute('data-vimeo-muted', 'true');
          } else {
            player.setVolume(1);
            vimeoElement.setAttribute('data-vimeo-muted', 'false');
          }
        });

        // Fullscreen
        const fullscreenBtn = vimeoElement.querySelector('[data-vimeo-control="fullscreen"]');
        if (fullscreenBtn) {
          fullscreenBtn.addEventListener('click', () => {
            const fullscreenElement = document.getElementById(videoIndexID);
            if (!fullscreenElement) return;
            const isFullscreen = document.fullscreenElement;
            if (isFullscreen) {
              vimeoElement.setAttribute('data-vimeo-fullscreen', 'false');
              document.exitFullscreen();
            } else {
              vimeoElement.setAttribute('data-vimeo-fullscreen', 'true');
              fullscreenElement.requestFullscreen();
            }
          });
        }

        const handleFullscreenChange = () => {
          const isFullscreen = !!document.fullscreenElement;
          vimeoElement.setAttribute('data-vimeo-fullscreen', isFullscreen ? 'true' : 'false');
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        function secondsTimeSpanToHMS(s: number) {
          let m = Math.floor(s / 60);
          s -= m * 60;
          return m + ":" + (s < 10 ? '0' + s : s);
        }

        const vimeoDuration = vimeoElement.querySelector('[data-vimeo-duration]');
        player.getDuration().then(function(duration: number) {
          if (vimeoDuration) {
            vimeoDuration.textContent = secondsTimeSpanToHMS(duration);
          }
          vimeoElement.querySelectorAll('[data-vimeo-control="timeline"], progress').forEach((el) => {
            el.setAttribute('max', duration.toString());
          });
        });

        const timelineElem = vimeoElement.querySelector('[data-vimeo-control="timeline"]') as HTMLInputElement;
        const progressElem = vimeoElement.querySelector('progress') as HTMLProgressElement;

        const updateTimelineValue = () => {
          player.getDuration().then(function() {
            const timeVal = parseFloat(timelineElem.value);
            player.setCurrentTime(timeVal);
            if (progressElem) progressElem.value = timeVal;
          });
        };

        if (timelineElem) {
          ['input', 'change'].forEach((evt) => {
            timelineElem.addEventListener(evt, updateTimelineValue);
          });
        }

        player.on('timeupdate', function(data: { seconds: number }) {
          if (timelineElem) timelineElem.value = data.seconds.toString();
          if (progressElem) progressElem.value = data.seconds;
          if (vimeoDuration) vimeoDuration.textContent = secondsTimeSpanToHMS(Math.trunc(data.seconds));
        });

        let vimeoHoverTimer: any;
        vimeoElement.addEventListener('mousemove', function() {
          vimeoElement.setAttribute('data-vimeo-hover', 'true');
          clearTimeout(vimeoHoverTimer);
          vimeoHoverTimer = setTimeout(() => vimeoElement.setAttribute('data-vimeo-hover', 'false'), 3000);
        });

        player.on('ended', function() {
          vimeoElement.setAttribute('data-vimeo-activated', 'false');
          vimeoElement.setAttribute('data-vimeo-playing', 'false');
          player.unload();
        });
      });
    }

    initVimeoPlayer();

    // 2. Menu Logic
    function initMenu() {
      let navWrap = document.querySelector(".nav");
      if (!navWrap) return;
      let state = navWrap.getAttribute("data-nav");
      let overlay = navWrap.querySelector(".overlay");
      let menu = navWrap.querySelector(".menu");
      let bgPanels = navWrap.querySelectorAll(".bg-panel");
      let menuToggles = document.querySelectorAll("[data-menu-toggle]");
      let menuLinks = navWrap.querySelectorAll(".menu-link");
      let fadeTargets = navWrap.querySelectorAll("[data-menu-fade]");
      let menuButton = document.querySelector(".menu-button");
      if (!menuButton) return;
      let menuButtonTexts = menuButton.querySelectorAll("p");
      let menuButtonIcon = menuButton.querySelector(".menu-button-icon");

      let tl = gsap.timeline();

      const openNav = () => {
        navWrap.setAttribute("data-nav", "open");
        tl.clear()
          .set(navWrap, { display: "block" })
          .set(menu, { yPercent: 0 }, "<")
          .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 })
          .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(bgPanels, { yPercent: -101 }, { yPercent: 0, stagger: 0.15, duration: 0.7 }, "<")
          .fromTo(menu, { yPercent: -100 }, { yPercent: 0, duration: 0.8 }, "<+=0.2")
          .fromTo(menuLinks, { yPercent: 140 }, { yPercent: 0, rotate: 0, stagger: 0.06 }, "<+=0.7")
          .fromTo(fadeTargets, { autoAlpha: 0 }, { autoAlpha: 1, yPercent: 0, stagger: 0.05 }, "<+=0.3");
      };

      const closeNav = () => {
        navWrap.setAttribute("data-nav", "closed");
        tl.clear()
          .to(overlay, { autoAlpha: 0, duration: 0.6 })
          .to(menu, { yPercent: -120, duration: 0.7 })
          .to(menuButtonTexts, { yPercent: 0 }, "<")
          .to(menuButtonIcon, { rotate: 0 }, "<")
          .set(navWrap, { display: "none" });
      };

      menuToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
          state = navWrap.getAttribute("data-nav");
          if (state === "open") {
            closeNav();
          } else {
            openNav();
          }
        });
      });

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && navWrap.getAttribute("data-nav") === "open") {
          closeNav();
        }
      };
      document.addEventListener("keydown", handleEscape);
    }
    initMenu();

    // 3. Logo Text split-type + fade out on scroll
    const initLogoText = () => {
      const splitText = new SplitType(".logo-text", { types: "chars" });
      const chars = splitText.chars;
      if (!chars) return;

      chars.forEach((char) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("char-wrapper");
        char.parentNode?.insertBefore(wrapper, char);
        wrapper.appendChild(char);
      });

      gsap.set(chars, { opacity: 1, x: 0 });

      let isFadedOut = false;
      const handleLogoScroll = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition >= 64 && !isFadedOut) {
          isFadedOut = true;
          gsap.killTweensOf(chars);
          gsap.to(chars, { opacity: 0, x: -20, duration: 1, ease: "power4.out" });
        } else if (scrollPosition < 64 && isFadedOut) {
          isFadedOut = false;
          gsap.killTweensOf(chars);
          gsap.to(chars, { opacity: 1, x: 0, duration: 1, ease: "power4.out" });
        }
      };

      window.addEventListener("scroll", handleLogoScroll);
    };
    initLogoText();

    // 4. Custom Cursor
    const initCustomCursor = () => {
      let mmCursor = gsap.matchMedia();
      mmCursor.add("(min-width: 991px)", () => {
        let cursorItem = document.querySelector(".cursor") as HTMLElement;
        if (!cursorItem) return;
        let cursorParagraph = cursorItem.querySelector("p");
        let targets = document.querySelectorAll("[data-cursor]");
        let xOffset = 6;
        let yOffset = 140;
        let cursorIsOnRight = false;
        let currentTarget: Element | null = null;
        let lastText = '';

        gsap.set(cursorItem, { xPercent: xOffset, yPercent: yOffset });

        let xTo = gsap.quickTo(cursorItem, "x", { ease: "power3" });
        let yTo = gsap.quickTo(cursorItem, "y", { ease: "power3" });

        const getCursorEdgeThreshold = () => cursorItem.offsetWidth + 16;

        const handleMouseMove = (e: MouseEvent) => {
          let windowWidth = window.innerWidth;
          let windowHeight = window.innerHeight;
          let scrollY = window.scrollY;
          let cursorX = e.clientX;
          let cursorY = e.clientY + scrollY;

          let xPercent = xOffset;
          let yPercent = yOffset;

          let cursorEdgeThreshold = getCursorEdgeThreshold();
          if (cursorX > windowWidth - cursorEdgeThreshold) {
            cursorIsOnRight = true;
            xPercent = -100;
          } else {
            cursorIsOnRight = false;
          }

          if (cursorY > scrollY + windowHeight * 0.9) {
            yPercent = -120;
          }

          if (currentTarget) {
            let newText = currentTarget.getAttribute("data-cursor") || '';
            if (newText !== lastText && cursorParagraph) {
              cursorParagraph.innerHTML = newText;
              lastText = newText;
              cursorEdgeThreshold = getCursorEdgeThreshold();
            }
          }

          gsap.to(cursorItem, { xPercent: xPercent, yPercent: yPercent, duration: 0.9, ease: "power3" });
          xTo(cursorX);
          yTo(cursorY - scrollY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        targets.forEach(target => {
          target.addEventListener("mouseenter", () => {
            currentTarget = target;
            let newText = target.getAttribute("data-cursor") || '';
            if (newText !== lastText && cursorParagraph) {
              cursorParagraph.innerHTML = newText;
              lastText = newText;
            }
          });

          target.addEventListener("mouseleave", () => {
            currentTarget = null;
          });
        });

        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          gsap.set(cursorItem, { x: 0, y: 0, autoAlpha: 0 });
        };
      });

      // Basic cursor dot follow
      gsap.set(".cursor-dot", { xPercent: -50, yPercent: -50 });
      let dotXTo = gsap.quickTo(".cursor-dot", "x", { duration: 0.01, ease: "power3" });
      let dotYTo = gsap.quickTo(".cursor-dot", "y", { duration: 0.01, ease: "power3" });

      const handleDotMouseMove = (e: MouseEvent) => {
        dotXTo(e.clientX);
        dotYTo(e.clientY);
      };
      window.addEventListener("mousemove", handleDotMouseMove);
    };
    initCustomCursor();

    // 5. Hero Intro Animation
    const initHeroIntroAnimation = () => {
      let tl = gsap.timeline({ defaults: { ease: "power2.out" } }).delay(1);
      $(".home-hero_top, .hero-svg, .home-hero_text-wrap").removeClass("hidden");
      tl.from(".home-hero_top", {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1
      });
      tl.from(".hero-svg", {
        opacity: 0,
        duration: 1,
      }, "-=0.1");
      tl.from(".home-hero_text-wrap > *", {
        opacity: 0,
        duration: 0.7,
        stagger: 0.12
      }, "-=0.5");
      tl.eventCallback("onComplete", function() {
        document.dispatchEvent(new Event("pageIntroFinished"));
      });
    };
    initHeroIntroAnimation();

    // 6. Lenis smooth scroll toggle
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    $("[data-lenis-start]").on("click", function() {
      lenis.start();
    });
    $("[data-lenis-stop]").on("click", function() {
      lenis.stop();
    });
    $("[data-lenis-toggle]").on("click", function() {
      $(this).toggleClass("stop-scroll");
      if ($(this).hasClass("stop-scroll")) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    // 7. Line animation split
    setTimeout(() => {
      $("[js-line-animation]").each(function() {
        gsap.set($(this), { autoAlpha: 1 });
        let textEl = $(this);
        let textContent = $(this).text();
        let tl: gsap.core.Timeline;

        let delayValue = parseFloat($(this).attr("data-delay") || "0") || 0;

        function splitText() {
          new SplitType(textEl[0], {
            types: "lines",
            tagName: "span"
          });
          textEl.find(".line").each(function() {
            let lineContent = $(this).html();
            $(this).html("");
            $(this).append(\`<span class="line-inner" style="display: block;">\${lineContent}</span>\`);
          });

          tl = gsap.timeline({
            scrollTrigger: {
              trigger: textEl[0],
              start: "top 75%",
              end: "bottom 75%"
            }
          });

          tl.fromTo(
            textEl.find(".line-inner"),
            { yPercent: 100 },
            {
              yPercent: 0,
              duration: 0.6,
              stagger: { amount: 0.4, ease: "power1.out" },
              delay: delayValue
            }
          );
        }

        splitText();

        let windowWidth = window.innerWidth;
        window.addEventListener("resize", function() {
          if (windowWidth !== window.innerWidth) {
            windowWidth = window.innerWidth;
            tl.kill();
            textEl.text(textContent);
            splitText();
          }
        });
      });
    }, 700);

    // 8. Fade Up
    setTimeout(() => {
      $("[data-fade]").each(function() {
        let wrap = $(this);
        let delayValue = parseFloat(wrap.attr("data-delay") || "0") || 0;
        let yStartValue = parseFloat(wrap.attr("data-y") || "20") || 20;

        gsap.set(wrap[0], { visibility: "visible" });

        gsap.fromTo(
          wrap[0],
          { opacity: 0, yPercent: yStartValue },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: delayValue,
            scrollTrigger: {
              trigger: wrap[0],
              start: "top 80%",
              toggleActions: "play none none none",
            }
          }
        );
      });
    }, 700);

    // 9. Fade Up Children
    setTimeout(() => {
      $("[data-fade-children]").each(function() {
        let parent = $(this);
        let children = parent.children();
        let delayValue = parseFloat(parent.attr("data-fade-children") || "0") || 0;
        let yStartValue = parseFloat(parent.attr("data-y") || "20") || 20;

        gsap.set(children, { visibility: "visible" });

        gsap.fromTo(
          children,
          { opacity: 0, yPercent: yStartValue },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            delay: delayValue,
            scrollTrigger: {
              trigger: parent[0],
              start: "top 80%",
              toggleActions: "play none none none",
            }
          }
        );
      });
    }, 700);

    // 10. Horizontal Scroll Projects
    let scrollContainer = document.querySelector(".section_projects-scroll") as HTMLElement;
    let scrollContent = document.querySelector(".projects-scroll_compnent") as HTMLElement;
    let progressBar = document.querySelector(".projects-scroll_progress-bar") as HTMLElement;
    let projectItems = document.querySelectorAll(".projects-scroll_content");
    let numberCount = document.querySelector(".number-count");
    let numberCounter = document.querySelector(".number-counter");

    if (scrollContainer && scrollContent && numberCount && numberCounter) {
      numberCount.textContent = projectItems.length.toString();
      let mm = gsap.matchMedia();

      mm.add("(min-width: 991px)", () => {
        function updateScrollWidth() {
          let scrollWidth = scrollContent.scrollWidth - window.innerWidth;
          ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger === scrollContainer) trigger.kill();
          });

          let horizontalScroll = gsap.to(scrollContent, {
            x: -scrollWidth,
            ease: "none",
            scrollTrigger: {
              trigger: scrollContainer,
              start: "top top",
              end: () => \`+=\${scrollWidth}\`,
              pin: true,
              scrub: 1.2,
              anticipatePin: 1
            }
          });

          gsap.to(progressBar, {
            width: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: scrollContainer,
              start: "top top",
              end: () => \`+=\${scrollWidth}\`,
              scrub: 1
            }
          });

          projectItems.forEach((item, index) => {
            ScrollTrigger.create({
              trigger: item,
              start: "left 50%",
              end: "right 50%",
              horizontal: true,
              containerAnimation: horizontalScroll,
              onEnter: () => { if (numberCounter) numberCounter.textContent = \`\${index + 1}\` },
              onEnterBack: () => { if (numberCounter) numberCounter.textContent = \`\${index + 1}\` }
            });
          });

          projectItems.forEach((item) => {
            let leftChild = item.querySelector(".projects-scroll_content-left");
            let middleChild = item.querySelector(".projects-scroll_content-middle");
            let rightChild = item.querySelector(".projects-scroll_content-right");

            if (leftChild) {
              gsap.to(leftChild, {
                xPercent: -20,
                ease: "none",
                scrollTrigger: {
                  containerAnimation: horizontalScroll,
                  trigger: item,
                  start: "left right",
                  end: "left left",
                  scrub: 3
                }
              });
            }

            if (middleChild) {
              gsap.to(middleChild, {
                xPercent: -50,
                ease: "none",
                scrollTrigger: {
                  containerAnimation: horizontalScroll,
                  trigger: item,
                  start: "left right",
                  end: "left left",
                  scrub: 3
                }
              });
            }

            if (rightChild) {
              gsap.to(rightChild, {
                xPercent: -80,
                ease: "none",
                scrollTrigger: {
                  containerAnimation: horizontalScroll,
                  trigger: item,
                  start: "left right",
                  end: "left left",
                  scrub: 3
                }
              });
            }
          });

          return horizontalScroll;
        }

        let horizontalScroll = updateScrollWidth();
        window.addEventListener("resize", () => {
          horizontalScroll = updateScrollWidth();
        });

        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          gsap.set(scrollContent, { x: 0 });
        };
      });
    }

    // 11. Blog news CTA image hover scale
    document.querySelectorAll(".news-cta_image-wrap").forEach((wrap) => {
      let image = wrap.querySelector(".news-cta_image");
      if (image) {
        wrap.addEventListener("mouseenter", () => {
          gsap.to(image, { scale: 1.05, duration: 0.8, ease: "power2.out" });
        });
        wrap.addEventListener("mouseleave", () => {
          gsap.to(image, { scale: 1, duration: 0.8, ease: "power2.out" });
        });
      }
    });

    // 12. Page Transition Columns slide out on load
    const tlIntro = gsap.timeline({ defaults: { ease: "power4.inOut" } });
    tlIntro.fromTo(".transition_column", { yPercent: 0 }, {
      yPercent: -100,
      stagger: { amount: 0.5, from: "random" },
      duration: 1.2,
      onComplete: () => {
        gsap.set(".transition_wrap", { display: "none" });
      }
    });

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="immersive-container">
      {/* HTML Content */}
      ${jsx}

      {/* Global CSS Style */}
      <style dangerouslySetInnerHTML={{ __html: ${JSON.stringify(combinedCss)} }} />
    </div>
  );
}
`;

  // Write component
  const targetPath = path.join(__dirname, '..', 'src', 'components', 'homepage', 'HeroImmersive.tsx');
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, componentContent, 'utf8');
  console.log('HeroImmersive.tsx written successfully to', targetPath);
}

run().catch(console.error);
