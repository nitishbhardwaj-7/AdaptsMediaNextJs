"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function VideoRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Mobile guard — WebGL ripple is desktop only
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    if (isMobile) {
      return
    }

    // Get the hidden video element
    const video = document.querySelector(".hero-video") as HTMLVideoElement
    if (!video) {
      console.warn("VideoRipple: .hero-video element not found")
      return
    }

    // Get the parent hero section container
    const heroSection = video.closest("section")
    if (!heroSection) {
      console.warn("VideoRipple: hero section not found")
      return
    }

    // Hide the original video — WebGL canvas shows it instead
    video.style.opacity = "0"
    video.style.position = "absolute"

    // ═══════════════════════════════════════════════════════════════
    // STEP 1: THREE.JS SCENE SETUP
    // ═══════════════════════════════════════════════════════════════

    const getContainerSize = () => {
      return {
        width: heroSection.clientWidth,
        height: heroSection.clientHeight,
      }
    }

    const containerSize = getContainerSize()

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current!,
      alpha: false,
      antialias: false,
    })
    renderer.setSize(containerSize.width, containerSize.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const videoTexture = new THREE.VideoTexture(video)
    videoTexture.minFilter = THREE.LinearFilter
    videoTexture.magFilter = THREE.LinearFilter
    videoTexture.format = THREE.RGBAFormat
    videoTexture.wrapS = THREE.ClampToEdgeWrapping
    videoTexture.wrapT = THREE.ClampToEdgeWrapping

    const geometry = new THREE.PlaneGeometry(2, 2)

    // ═══════════════════════════════════════════════════════════════
    // STEP 2 & 3: SHADERS
    // ═══════════════════════════════════════════════════════════════

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform vec2 uMouse;
      uniform float uTime;
      uniform float uIntensity;
      uniform float uSpeed;
      uniform vec2 uVelocity;
      uniform float uGlitchSeed;
      uniform vec2 uResolution;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
          f.y
        );
      }

      vec3 rgb2hsv(vec3 c) {
        vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
        vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
        vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
        float d = q.x - min(q.w, q.y);
        float e = 1.0e-10;
        return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
      }

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      void main() {
        vec2 uv = vUv;
        float aspect = uResolution.x / uResolution.y;

        vec2 diff = uv - uMouse;
        diff.x *= aspect;
        float dist = length(diff);
        vec2 dir = normalize(diff + 0.001);

        float zone = exp(-dist * 4.5) * uIntensity;
        float hotzone = exp(-dist * 9.0) * uIntensity;

        vec2 rippleUV = uv;
        vec3 col = texture2D(uTexture, rippleUV).rgb;

        if (zone > 0.01) {
          float wave = sin(dist * 22.0 - uTime * 7.0)
                       * exp(-dist * 5.5)
                       * uIntensity;
          rippleUV = uv + dir * wave * 0.035;

          float aberrationStrength = zone * 0.045 * (1.0 + uSpeed * 3.2);

          vec2 uvR = rippleUV + dir * aberrationStrength * 1.8;
          vec2 uvB = rippleUV - dir * aberrationStrength * 1.5;
          vec2 uvG = rippleUV;

          float r = texture2D(uTexture, uvR).r;
          float g = texture2D(uTexture, uvG).g;
          float b = texture2D(uTexture, uvB).b;
          col = vec3(r, g, b);

          float glitchTrigger = step(0.25, uSpeed) * zone;

          if (glitchTrigger > 0.0) {
            float row = floor(uv.y * 120.0);
            float rowRand = hash(vec2(row, floor(uGlitchSeed * 100.0)));
            float isGlitching = step(0.75, rowRand);
            float shift = (rowRand - 0.5) * 0.12 * glitchTrigger * isGlitching;

            float rGlitch = texture2D(uTexture, vec2(uv.x + shift * 2.0, uv.y)).r;
            float bGlitch = texture2D(uTexture, vec2(uv.x - shift * 1.8, uv.y)).b;
            float gGlitch = texture2D(uTexture, vec2(uv.x + shift * 0.3, uv.y)).g;

            vec3 glitchedCol = vec3(rGlitch, gGlitch, bGlitch);
            float glitchMix = isGlitching * zone * 1.2;
            col = mix(col, glitchedCol, glitchMix);
          }

          float scanline = sin(uv.y * 240.0 + uTime * 8.0) * 0.5 + 0.5;
          float scanlineStrength = zone * (0.3 + zone * 0.6) * (0.6 + scanline * 0.4);
          col *= (1.0 - scanlineStrength * 0.35);

          float interlace = mod(floor(uv.y * 480.0), 2.0);
          float interlaceEffect = zone * interlace * 0.35;
          col -= interlaceEffect * vec3(0.15, 0.0, 0.0);

          float distortPulse = sin(uTime * 10.0 + dist * 20.0) * 0.5 + 0.5;
          float yShift = (distortPulse - 0.5) * 0.008 * hotzone;
          col += texture2D(uTexture, uv + vec2(0.0, yShift)).rgb * hotzone * 0.15;
        }

        col = clamp(col, 0.0, 1.0);
        gl_FragColor = vec4(col, 1.0);
      }
    `

    // ═══════════════════════════════════════════════════════════════
    // STEP 4: UNIFORMS + MATERIAL
    // ═══════════════════════════════════════════════════════════════

    const uniforms = {
      uTexture: { value: videoTexture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uIntensity: { value: 0 },
      uSpeed: { value: 0 },
      uVelocity: { value: new THREE.Vector2(0, 0) },
      uGlitchSeed: { value: 0 },
      uResolution: { value: new THREE.Vector2(containerSize.width, containerSize.height) },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // ═══════════════════════════════════════════════════════════════
    // STEP 5: MOUSE TRACKING WITH SPRING PHYSICS
    // ═══════════════════════════════════════════════════════════════

    const rawMouse = new THREE.Vector2(0.5, 0.5)
    const smoothMouse = new THREE.Vector2(0.5, 0.5)
    const velocity = new THREE.Vector2(0, 0)
    const prevMouse = new THREE.Vector2(0.5, 0.5)

    let intensity = 0
    let targetIntensity = 0
    let isMoving = false
    let moveTimeout: ReturnType<typeof setTimeout>

    const handleMouseMove = (e: MouseEvent) => {
      // Get hero section position relative to viewport
      const rect = heroSection.getBoundingClientRect()

      // Only track if mouse is over the hero section
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return
      }

      rawMouse.set(
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height
      )

      velocity.set(rawMouse.x - prevMouse.x, rawMouse.y - prevMouse.y)
      const speed = velocity.length()

      targetIntensity = Math.min(speed * 55, 1.0)
      isMoving = true

      clearTimeout(moveTimeout)
      moveTimeout = setTimeout(() => {
        isMoving = false
        targetIntensity = 0
      }, 100)

      prevMouse.copy(rawMouse)
    }

    window.addEventListener("mousemove", handleMouseMove)

    // ═══════════════════════════════════════════════════════════════
    // STEP 6: ANIMATION LOOP
    // ═══════════════════════════════════════════════════════════════

    const clock = new THREE.Clock()
    let animId: number

    const animate = () => {
      animId = requestAnimationFrame(animate)

      const elapsed = clock.getElapsedTime()

      smoothMouse.lerp(rawMouse, 0.08)

      const lerpSpeed = isMoving ? 0.18 : 0.04
      intensity += (targetIntensity - intensity) * lerpSpeed

      uniforms.uMouse.value.copy(smoothMouse)
      uniforms.uTime.value = elapsed
      uniforms.uIntensity.value = intensity
      uniforms.uVelocity.value.copy(velocity)
      uniforms.uSpeed.value = Math.min(velocity.length() * 60, 1.0)
      uniforms.uGlitchSeed.value = Math.random()

      // VideoTexture must be marked needsUpdate every frame
      videoTexture.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // ═══════════════════════════════════════════════════════════════
    // STEP 7: RESIZE HANDLER
    // ═══════════════════════════════════════════════════════════════

    const handleResize = () => {
      const newSize = getContainerSize()
      renderer.setSize(newSize.width, newSize.height)
      uniforms.uResolution.value.set(newSize.width, newSize.height)
    }

    // Use ResizeObserver to track hero section size changes
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(heroSection)

    // ═══════════════════════════════════════════════════════════════
    // STEP 9: CLEANUP
    // ═══════════════════════════════════════════════════════════════

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("mousemove", handleMouseMove)
      resizeObserver.disconnect()
      clearTimeout(moveTimeout)
      renderer.dispose()
      videoTexture.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  )
}
