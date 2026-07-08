import type { Object3DNode } from '@react-three/fiber'
import * as THREE from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>
      directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>
      mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>
      group: Object3DNode<THREE.Group, typeof THREE.Group>
      meshStandardMaterial: Object3DNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>
      primitive: Object3DNode<any, any>
    }
  }
}
