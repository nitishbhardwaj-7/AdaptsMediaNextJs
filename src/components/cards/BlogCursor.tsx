"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export default function BlogCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const delayTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 1.2,
          ease: "power2.out",
        })
      }
    }

    const handleBlogHoverEnter = () => {
      if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current)
      delayTimeoutRef.current = setTimeout(() => {
        setIsVisible(true)
      }, 200)
    }

    const handleBlogHoverLeave = () => {
      if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current)
      setIsVisible(false)
    }

    // Listen for both custom events and also check if we're over blog cards directly
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("blog-card-enter", handleBlogHoverEnter)
    document.addEventListener("blog-card-leave", handleBlogHoverLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("blog-card-enter", handleBlogHoverEnter)
      document.removeEventListener("blog-card-leave", handleBlogHoverLeave)
      if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      <div
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "18px",
          background: "rgba(255, 255, 255, 0.10)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.20)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#fff",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.04em",
          lineHeight: "1.25",
          textAlign: "center",
        }}
      >
        <span>VIEW</span>
        <span>BLOG</span>
      </div>
    </div>
  )
}

