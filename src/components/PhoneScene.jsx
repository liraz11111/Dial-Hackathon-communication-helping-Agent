import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

function Phone() {
  const tilt = useRef()

  useFrame((state) => {
    const { x, y } = state.pointer
    if (tilt.current) {
      tilt.current.rotation.y = THREE.MathUtils.lerp(tilt.current.rotation.y, x * 0.6, 0.06)
      tilt.current.rotation.x = THREE.MathUtils.lerp(tilt.current.rotation.x, -y * 0.45, 0.06)
    }
  })

  return (
    <group ref={tilt}>
      <Float speed={1.15} rotationIntensity={0.22} floatIntensity={0.7}>
        {/* body */}
        <RoundedBox args={[2.1, 4.2, 0.34]} radius={0.27} smoothness={6}>
          <meshStandardMaterial color="#0d1430" metalness={0.72} roughness={0.26} />
        </RoundedBox>

        {/* glowing screen */}
        <RoundedBox args={[1.78, 3.66, 0.06]} radius={0.2} smoothness={6} position={[0, 0.06, 0.19]}>
          <meshStandardMaterial color="#06241f" emissive="#23b89c" emissiveIntensity={0.6} metalness={0.2} roughness={0.45} />
        </RoundedBox>

        {/* speech bubbles on screen */}
        <RoundedBox args={[1.0, 0.42, 0.04]} radius={0.18} smoothness={4} position={[-0.28, 0.95, 0.24]}>
          <meshStandardMaterial color="#a5b4fc" emissive="#6366f1" emissiveIntensity={0.45} roughness={0.5} />
        </RoundedBox>
        <RoundedBox args={[1.05, 0.42, 0.04]} radius={0.18} smoothness={4} position={[0.26, 0.2, 0.24]}>
          <meshStandardMaterial color="#9fe6d8" emissive="#23b89c" emissiveIntensity={0.5} roughness={0.5} />
        </RoundedBox>
        <RoundedBox args={[0.8, 0.4, 0.04]} radius={0.16} smoothness={4} position={[-0.4, -0.5, 0.24]}>
          <meshStandardMaterial color="#ffd0c4" emissive="#ff7a5c" emissiveIntensity={0.45} roughness={0.5} />
        </RoundedBox>

        {/* camera dot */}
        <mesh position={[0, 1.78, 0.21]}>
          <circleGeometry args={[0.05, 24]} />
          <meshStandardMaterial color="#0b1020" />
        </mesh>

        {/* call button */}
        <mesh position={[0, -1.46, 0.23]}>
          <circleGeometry args={[0.34, 48]} />
          <meshStandardMaterial color="#ff7a5c" emissive="#ff7a5c" emissiveIntensity={0.95} />
        </mesh>
      </Float>
    </group>
  )
}

function Rings() {
  const refs = [useRef(), useRef(), useRef()]
  useFrame((state) => {
    const t = state.clock.elapsedTime
    refs.forEach((r, i) => {
      if (!r.current) return
      const p = (t * 0.42 + i / 3) % 1
      const s = 1.5 + p * 2.8
      r.current.scale.set(s, s, s)
      r.current.material.opacity = 0.45 * (1 - p)
    })
  })
  return (
    <group position={[0, 0, -0.4]}>
      {refs.map((r, i) => (
        <mesh key={i} ref={r}>
          <torusGeometry args={[1.3, 0.018, 16, 90]} />
          <meshBasicMaterial color="#23b89c" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

export default function PhoneScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8.6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.85} />
        <directionalLight position={[5, 8, 6]} intensity={2.2} />
        <pointLight position={[-4, -2, 4]} color="#6366f1" intensity={70} />
        <pointLight position={[4, -3, 3]} color="#ff7a5c" intensity={55} />
        <pointLight position={[0, 3, 5]} color="#23b89c" intensity={55} />
        <Rings />
        <Phone />
      </Suspense>
    </Canvas>
  )
}
