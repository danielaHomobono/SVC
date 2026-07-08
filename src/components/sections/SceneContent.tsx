// @ts-nocheck
import React, { Suspense, useState, useEffect } from 'react'

export default function SceneContent() {
  const [mounted, setMounted] = useState(false)
  const [Canvas, setCanvas] = useState<any>(null)

  useEffect(() => {
    // Use requestAnimationFrame to defer until browser is ready
    let frameId: number
    let mounted = true

    const loadModules = async () => {
      try {
        const fiberMod = await import('@react-three/fiber')
        
        if (!mounted) return
        
        setCanvas(() => fiberMod.Canvas)
      } catch (err) {
        console.error('Failed to load Canvas:', err)
      }
    }

    frameId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        loadModules().then(() => {
          if (mounted) setMounted(true)
        })
      })
    })

    return () => {
      mounted = false
      cancelAnimationFrame(frameId)
    }
  }, [])

  if (!mounted || !Canvas) {
    return <div style={{ width: '100%', height: '100%', background: '#0a0906' }} />
  }

  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 2.5, 8], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 2]} intensity={2.5} castShadow />
      {/* Scene content will be added here */}
    </Canvas>
  )
}
