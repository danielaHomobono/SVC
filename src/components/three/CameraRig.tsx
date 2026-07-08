// @ts-nocheck
'use client'
import { useEffect, useRef } from 'react'
import { initGSAP } from '@/lib/gsapConfig'
import * as THREE from 'three'

let useFrame: any = null
let useThree: any = null

// Lazy load r3f hooks
const getRFHooks = async () => {
  if (!useFrame || !useThree) {
    const mod = await import('@react-three/fiber')
    useFrame = mod.useFrame
    useThree = mod.useThree
  }
  return { useFrame, useThree }
}

const CAMERA_KEYFRAMES = [
  { position: new THREE.Vector3(0, 2.5, 8), target: new THREE.Vector3(0, 1.0, 0) },
  { position: new THREE.Vector3(0, 1.8, 4), target: new THREE.Vector3(0, 1.2, 0) },
  { position: new THREE.Vector3(-1.5, 1.4, 1), target: new THREE.Vector3(0.5, 1.0, -1) },
  { position: new THREE.Vector3(0.5, 1.2, 0.2), target: new THREE.Vector3(-0.5, 0.9, -1.5) },
]

export function CameraRig() {
  // This hook will fail if called before r3f context is ready
  // We'll catch and handle it gracefully
  try {
    const { useThree: useThreeHook, useFrame: useFrameHook } = require('@react-three/fiber')
    const { camera } = useThreeHook()
    const progressRef = useRef(0)
    const currentPos = useRef(new THREE.Vector3())
    const currentTarget = useRef(new THREE.Vector3())

    useEffect(() => {
      const { gsap, ScrollTrigger } = initGSAP()
      if (!gsap || !ScrollTrigger) return

      const st = ScrollTrigger.create({
        trigger: '#experiencia',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2.5,
        onUpdate: (self: any) => {
          progressRef.current = self.progress
        },
      })

      return () => st.kill()
    }, [])

    useFrameHook(() => {
      const p = progressRef.current
      const segment = Math.min(p * 3, 2.9999)
      const idx = Math.floor(segment)
      const t = segment - idx
      const from = CAMERA_KEYFRAMES[idx]
      const to = CAMERA_KEYFRAMES[idx + 1]
      if (!from || !to) return
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      currentPos.current.lerpVectors(from.position, to.position, ease)
      currentTarget.current.lerpVectors(from.target, to.target, ease)
      camera.position.copy(currentPos.current)
      camera.lookAt(currentTarget.current)
    })

    return null
  } catch (err) {
    console.warn('CameraRig not in R3F context:', err)
    return null
  }
}

