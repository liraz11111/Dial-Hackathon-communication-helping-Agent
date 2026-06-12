import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'
import Phone3D from './three/Phone3D.jsx'

// Display-only ambient backdrop: two phones with a particle stream crossing
// between them. No controls, no input — sending happens only inside chats.

function Rig({ children }) {
  const ref = useRef()
  useFrame((s) => {
    if (!ref.current) return
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, s.pointer.x * 0.16, 0.04)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -s.pointer.y * 0.08, 0.04)
  })
  return <group ref={ref}>{children}</group>
}

function Stream({ flow }) {
  const N = 90
  const geom = useRef()
  const matRef = useRef()
  const prevFlow = useRef(flow)
  const burstAt = useRef(-100)

  const curve = useMemo(
    () =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-2.7, 0.7, 0.25),
        new THREE.Vector3(0, 3.1, 0.7),
        new THREE.Vector3(2.7, 0.7, 0.25),
      ),
    [],
  )

  const { positions, colors, phases } = useMemo(() => {
    const positions = new Float32Array(N * 3)
    const colors = new Float32Array(N * 3)
    const phases = new Float32Array(N)
    const a = new THREE.Color('#a99bff')
    const b = new THREE.Color('#ff8a5f')
    for (let i = 0; i < N; i++) {
      phases[i] = i / N
      const c = a.clone().lerp(b, i / N)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors, phases }
  }, [])

  useFrame((s) => {
    const e = s.clock.elapsedTime
    if (flow !== prevFlow.current) {
      prevFlow.current = flow
      burstAt.current = e
    }
    const since = e - burstAt.current
    const bursting = since >= 0 && since < 2.3
    const speed = bursting ? 0.5 : 0.1
    const arr = geom.current.attributes.position.array
    for (let i = 0; i < N; i++) {
      const t = (e * speed + phases[i]) % 1
      const p = curve.getPoint(t)
      const wob = Math.sin((e + i) * 2) * 0.04
      arr[i * 3] = p.x
      arr[i * 3 + 1] = p.y + wob
      arr[i * 3 + 2] = p.z
    }
    geom.current.attributes.position.needsUpdate = true
    if (matRef.current) {
      const target = bursting ? 0.9 : 0.32
      matRef.current.opacity += (target - matRef.current.opacity) * 0.1
      matRef.current.size += ((bursting ? 0.15 : 0.09) - matRef.current.size) * 0.1
    }
  })

  return (
    <points>
      <bufferGeometry ref={geom}>
        <bufferAttribute attach="attributes-position" count={N} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={N} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        vertexColors
        size={0.09}
        transparent
        opacity={0.32}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

function Scene({ flow }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} />
      <Environment resolution={256}>
        <Lightformer intensity={2} position={[0, 3, 4]} scale={[7, 3, 1]} color="#d8d2ff" />
        <Lightformer intensity={1.4} position={[-5, 1, 2]} scale={[3, 4, 1]} color="#a99bff" />
        <Lightformer intensity={1.4} position={[5, 1, 2]} scale={[3, 4, 1]} color="#ffb89c" />
        <Lightformer intensity={1} position={[0, -3, 3]} scale={[7, 2, 1]} color="#7c6cff" />
      </Environment>

      <Rig>
        <Float speed={1} rotationIntensity={0.12} floatIntensity={0.5}>
          <Phone3D position={[-3.05, -0.2, 0]} rotation={[0.06, 0.52, 0.06]} scale={0.92} accent="#7c6cff" />
        </Float>
        <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.5}>
          <Phone3D position={[3.05, -0.2, 0]} rotation={[0.06, -0.52, -0.06]} scale={0.92} accent="#ff8a5f" />
        </Float>
        <Stream flow={flow} />
      </Rig>

      <ContactShadows position={[0, -2.9, 0]} opacity={0.5} blur={2.8} far={4.5} scale={14} color="#05030f" />
    </>
  )
}

export default function TranslationBridge({ className = '' }) {
  const [flow, setFlow] = useState(0)

  // Gentle, ambient auto-bursts to keep the stream alive (no interaction).
  useEffect(() => {
    const id = setInterval(() => setFlow((f) => f + 1), 4200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <Canvas
        className="!absolute inset-0"
        dpr={[1, 2]}
        camera={{ position: [0, 0.4, 9.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <Scene flow={flow} />
        </Suspense>
      </Canvas>
    </div>
  )
}
