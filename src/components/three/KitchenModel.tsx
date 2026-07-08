// @ts-nocheck
import React from 'react'
import { useMemo } from 'react'
import * as THREE from 'three'

export default function KitchenModel() {
  // Procedural simple kitchen using boxes and planes
  const geometries = useMemo(() => {
    const floor = new THREE.PlaneGeometry(6, 4)
    const island = new THREE.BoxGeometry(1.8, 0.9, 0.8)
    return { floor, island }
  }, [])

  return (
    <>
      <group>
        <mesh rotation-x={-Math.PI / 2} receiveShadow>
          <primitive object={geometries.floor} />
          <meshStandardMaterial color="#8B6344" roughness={0.8} />
        </mesh>

        <mesh position={[0, 0.45, 0]} castShadow>
          <primitive object={geometries.island} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>

        {/* Walls, cabinets and lights would be added here */}
      </group>
    </>
  )
}
