"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger, SplitText } from "gsap/all"

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

const brands = [
  { name: "OSN", logo: "/images/osn.svg" },
  { name: "Daikin", logo: "/images/DAIKIN_logo.svg.png" },
  { name: "Braun", logo: "/images/braun.svg" },
  { name: "Toshiba", logo: "/images/960px-TOSHIBA_Logo.png" },
  { name: "Khaleej Times", logo: "/images/khaleej.svg" },
  { name: "Redington", logo: "/images/redington.svg" },
  { name: "Godiva", logo: "/images/godiva.svg" },
  { name: "Midea", logo: "/images/Midea.svg.png" },
  { name: "NBK", logo: "/images/NBK.svg.png" },
  { name: "Hasbro", logo: "/images/hasbro-new.png" },
]

const ClientsSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const gridWrapperRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const cleanups: (() => void)[] = []

    const heading = sectionRef.current?.querySelector(".clients-heading")
    const gridWrapper = gridWrapperRef.current
    const cells = gsap.utils.toArray<HTMLElement>(".client-logo-cell")
    const gridLines = sectionRef.current?.querySelector(".grid-lines-wrapper")
    const spotlight = sectionRef.current?.querySelector(".clients-spotlight") as HTMLElement

    // --- 1. Headline Masked Reveal Setup ---
    let headingSplit: SplitText | null = null
    if (heading) {
      headingSplit = SplitText.create(heading, {
        type: "lines",
        linesClass: "heading-line-parent",
      })

      headingSplit.lines.forEach((line) => {
        const wrap = document.createElement("div")
        wrap.className = "heading-line-wrap overflow-hidden py-[0.1em] -my-[0.1em]"
        line.parentNode?.insertBefore(wrap, line)
        wrap.appendChild(line)
        gsap.set(line, {
          yPercent: 105,
          opacity: 0,
          filter: "blur(8px)",
          scale: 0.98,
          transformOrigin: "center top",
        })
      })
    }

    // --- 2. Initialize Grid, Lines, and Logos ---
    gsap.set(cells, {
      opacity: 0,
      scale: 0.94,
      y: 24,
      filter: "blur(8px)",
    })

    const logos = gsap.utils.toArray<HTMLElement>(".client-logo-img")
    gsap.set(logos, {
      filter: "grayscale(1) blur(4px)",
      opacity: 0.35,
      scale: 0.96,
    })

    if (gridLines) {
      gsap.set(gridLines, { "--grid-mask": "0%" })
    }

    // --- 3. Entrance Animation Sequence ---
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })

    // A. Headline line reveal
    if (headingSplit) {
      entranceTl.to(headingSplit.lines, {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.15,
      }, 0)
    }

    // B. Grid Lines draw themselves from center outward
    if (gridLines) {
      entranceTl.to(gridLines, {
        "--grid-mask": "150%",
        duration: 1.8,
        ease: "power2.inOut",
      }, 0.3)
    }

    // C. Grid Cells ripple reveal from center
    const cols = isMobile ? 2 : window.innerWidth >= 1280 ? 5 : window.innerWidth >= 1024 ? 4 : 3
    const rows = Math.ceil(brands.length / cols)

    entranceTl.to(cells, {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.0,
      ease: "power3.out",
      stagger: {
        grid: [rows, cols],
        from: "center",
        amount: 0.8,
      },
    }, 0.5)

    // D. Logo Appearance (reduced grayscale to 0.85, blur removed, full opacity)
    entranceTl.to(logos, {
      filter: "grayscale(0.85) blur(0px)",
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: {
        grid: [rows, cols],
        from: "center",
        amount: 0.8,
      },
    }, 0.6)

    // --- 4. Ambient Motion Floating Loop ---
    entranceTl.add(() => {
      logos.forEach((logo, i) => {
        gsap.to(logo, {
          y: "random(-3, 3)",
          rotate: "random(-0.4, 0.4)",
          duration: gsap.utils.random(5, 8),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        })
      })
    })

    // --- 5. Interactive Mouse Effects (Desktop Only) ---
    if (!isMobile) {
      // Spotlight Overlay Follower
      if (gridWrapper && spotlight) {
        const spotX = gsap.quickTo(spotlight, "--mouse-x", { duration: 0.6, ease: "power2.out" })
        const spotY = gsap.quickTo(spotlight, "--mouse-y", { duration: 0.6, ease: "power2.out" })

        const onGridMouseMove = (e: MouseEvent) => {
          const rect = gridWrapper.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          spotX(`${x}px`)
          spotY(`${y}px`)
        }

        const onGridMouseEnter = () => {
          gsap.to(spotlight, { opacity: 1, duration: 0.4 })
        }

        const onGridMouseLeave = () => {
          gsap.to(spotlight, { opacity: 0, duration: 0.4 })
        }

        gridWrapper.addEventListener("mousemove", onGridMouseMove)
        gridWrapper.addEventListener("mouseenter", onGridMouseEnter)
        gridWrapper.addEventListener("mouseleave", onGridMouseLeave)

        cleanups.push(() => {
          gridWrapper.removeEventListener("mousemove", onGridMouseMove)
          gridWrapper.removeEventListener("mouseenter", onGridMouseEnter)
          gridWrapper.removeEventListener("mouseleave", onGridMouseLeave)
        })
      }

      // Tile 3D Tilt, Shine, and Hover Classification
      cells.forEach((cell, idx) => {
        const parallax = cell.querySelector(".client-logo-parallax")
        const inner = cell.querySelector(".client-logo-inner")
        const img = cell.querySelector(".client-logo-img")
        const shineOverlay = cell.querySelector(".client-shine-overlay")

        if (!inner || !img) return

        // 3D Tilt QuickTo set
        const tiltX = gsap.quickTo(inner, "rotateX", { duration: 0.4, ease: "power2.out" })
        const tiltY = gsap.quickTo(inner, "rotateY", { duration: 0.4, ease: "power2.out" })
        const moveX = gsap.quickTo(inner, "x", { duration: 0.4, ease: "power2.out" })
        const moveY = gsap.quickTo(inner, "y", { duration: 0.4, ease: "power2.out" })

        const onCellMouseMove = (e: MouseEvent) => {
          const rect = cell.getBoundingClientRect()
          const relX = (e.clientX - rect.left) / rect.width - 0.5
          const relY = (e.clientY - rect.top) / rect.height - 0.5

          tiltX(-relY * 3) // Max 3 deg
          tiltY(relX * 3)
          moveX(relX * 6)  // Max 6px
          moveY(relY * 6)
        }

        const onCellMouseLeave = () => {
          tiltX(0)
          tiltY(0)
          moveX(0)
          moveY(0)
        }

        cell.addEventListener("mousemove", onCellMouseMove)
        cell.addEventListener("mouseleave", onCellMouseLeave)
        cleanups.push(() => {
          cell.removeEventListener("mousemove", onCellMouseMove)
          cell.removeEventListener("mouseleave", onCellMouseLeave)
        })

        // Grid positions
        const row = Math.floor(idx / cols)
        const col = idx % cols

        const onCellMouseEnter = () => {
          // Hovered element style
          gsap.to(inner, { scale: 1.08, opacity: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" })
          gsap.to(img, { filter: "grayscale(0) brightness(1.1)", duration: 0.4, ease: "power2.out", overwrite: "auto" })

          // Shine sweep
          if (shineOverlay) {
            gsap.fromTo(shineOverlay,
              { "--shine-x": "-100%" },
              { "--shine-x": "200%", duration: 0.6, ease: "power2.out" }
            )
          }

          // Target neighbors and others
          cells.forEach((otherCell, otherIdx) => {
            if (otherCell === cell) return

            const otherInner = otherCell.querySelector(".client-logo-inner")
            const otherImg = otherCell.querySelector(".client-logo-img")
            const otherRow = Math.floor(otherIdx / cols)
            const otherCol = otherIdx % cols

            const distRow = Math.abs(row - otherRow)
            const distCol = Math.abs(col - otherCol)
            const isNeighbour = distRow <= 1 && distCol <= 1

            if (isNeighbour) {
              gsap.to(otherInner, { opacity: 0.6, scale: 0.98, duration: 0.4, ease: "power2.out", overwrite: "auto" })
              gsap.to(otherImg, { filter: "grayscale(0.85) brightness(1.0)", duration: 0.4, ease: "power2.out", overwrite: "auto" })
            } else {
              gsap.to(otherInner, { opacity: 0.35, scale: 0.96, duration: 0.4, ease: "power2.out", overwrite: "auto" })
              gsap.to(otherImg, { filter: "grayscale(0.85) brightness(1.0)", duration: 0.4, ease: "power2.out", overwrite: "auto" })
            }
          })
        }

        const onCellHoverExit = () => {
          // Reset all
          cells.forEach((c) => {
            const cInner = c.querySelector(".client-logo-inner")
            const cImg = c.querySelector(".client-logo-img")
            gsap.to(cInner, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" })
            gsap.to(cImg, { filter: "grayscale(0.85) brightness(1.0)", duration: 0.5, ease: "power2.out", overwrite: "auto" })
          })
        }

        cell.addEventListener("mouseenter", onCellMouseEnter)
        cell.addEventListener("mouseleave", onCellHoverExit)
        cleanups.push(() => {
          cell.removeEventListener("mouseenter", onCellMouseEnter)
          cell.removeEventListener("mouseleave", onCellHoverExit)
        })
      })
    }

    // --- 6. Scroll Parallax ---
    if (gridWrapper) {
      const topRowParallaxes = cells
        .filter((_, idx) => Math.floor(idx / cols) === 0)
        .map((c) => c.querySelector(".client-logo-parallax"))
      const bottomRowParallaxes = cells
        .filter((_, idx) => Math.floor(idx / cols) > 0)
        .map((c) => c.querySelector(".client-logo-parallax"))

      gsap.to(topRowParallaxes, {
        y: -12,
        ease: "none",
        scrollTrigger: {
          trigger: gridWrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(bottomRowParallaxes, {
        y: 12,
        ease: "none",
        scrollTrigger: {
          trigger: gridWrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }

    // --- 7. Random Highlight Loop ---
    let highlightInterval: ReturnType<typeof setInterval>
    if (!isMobile) {
      highlightInterval = setInterval(() => {
        const isHovered = document.querySelector(".client-logo-cell:hover")
        if (isHovered) return

        const randomIdx = Math.floor(Math.random() * cells.length)
        const cell = cells[randomIdx]
        const inner = cell?.querySelector(".client-logo-inner")
        const img = cell?.querySelector(".client-logo-img")

        if (inner && img) {
          gsap.timeline()
            .to(inner, { scale: 1.02, duration: 0.8, ease: "power2.out" })
            .to(img, { filter: "grayscale(0.6) brightness(1.2)", duration: 0.8, ease: "power2.out" }, 0)
            .to(inner, { scale: 1.0, duration: 0.8, ease: "power2.inOut" }, 1.2)
            .to(img, { filter: "grayscale(0.85) brightness(1.0)", duration: 0.8, ease: "power2.inOut" }, 1.2)
        }
      }, gsap.utils.random(5000, 8000))

      cleanups.push(() => clearInterval(highlightInterval))
    }

    // --- 8. Section Exit Animations ---
    if (heading && gridWrapper) {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(heading, { y: -30, ease: "none" })
      .to(gridWrapper, { opacity: 0.8, ease: "none" }, 0)
    }

    // Cleanup
    return () => {
      cleanups.forEach((fn) => fn())
      if (headingSplit) {
        headingSplit.revert()
      }
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-white py-20 font-sans w-full flex flex-col items-center overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        .clients-grid-wrapper {
          position: relative;
          overflow: hidden;
        }

        .grid-lines-wrapper {
          mask-image: radial-gradient(circle, black var(--grid-mask, 0%), transparent calc(var(--grid-mask, 0%) + 15%));
          -webkit-mask-image: radial-gradient(circle, black var(--grid-mask, 0%), transparent calc(var(--grid-mask, 0%) + 15%));
          --grid-mask: 0%;
        }

        .clients-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
          background: radial-gradient(circle 250px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(7, 71, 107, 0.05) 0%, transparent 100%);
          opacity: 0;
          will-change: transform, opacity;
        }

        .clients-grid-wrapper:hover .clients-spotlight {
          opacity: 1;
        }

        .client-logo-cell {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: white;
          z-index: 10;
        }

        .client-logo-inner {
          will-change: transform, opacity;
          transform-style: preserve-3d;
        }

        .client-logo-img {
          display: block;
          will-change: transform, opacity, filter;
          user-select: none;
          pointer-events: none;
        }

        .client-shine-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 20;
          background: linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.7) 50%, transparent 65%);
          transform: translateX(var(--shine-x, -100%)) skewX(-15deg);
          --shine-x: -100%;
        }

        @media (prefers-reduced-motion: reduce) {
          .client-logo-cell,
          .client-logo-img,
          .clients-heading * {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            filter: none !important;
            opacity: 1 !important;
          }
        }
      `}} />

      <div className="max-w-[1350px] px-8 md:px-16 w-full">
        <h2 className="clients-heading text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-medium text-[#07476B] mb-10 md:mb-16 tracking-tight">
          Brands We Work With
        </h2>

        <div ref={gridWrapperRef} className="clients-grid-wrapper grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
          {/* Animated Grid Lines Overlay */}
          <div className="grid-lines-wrapper absolute inset-0 pointer-events-none grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 border-t border-l border-gray-300 z-10">
            {brands.map((_, index) => (
              <div key={index} className="border-r border-b border-gray-300" />
            ))}
          </div>

          {/* Mouse-following Spotlight Overlay */}
          <div className="clients-spotlight" />

          {/* Logo Cells */}
          {brands.map((brand, index) => (
            <div
              key={index}
              className="client-logo-cell flex items-center justify-center p-6 md:p-12 h-40 sm:h-56 md:h-64 lg:h-72"
            >
              <div className="client-logo-parallax w-full h-full flex items-center justify-center">
                <div className="client-logo-inner relative w-full h-10 sm:h-12 md:h-14">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className="client-logo-img object-contain"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  />
                </div>
              </div>
              <div className="client-shine-overlay" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientsSection
