import { RoundedBox } from '@react-three/drei'

// A premium phone built from primitives — glossy physical material so it catches
// the environment reflections set up by the parent scene. Reusable mesh group.
export default function Phone3D({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, accent = '#23b89c' }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* metal body */}
      <RoundedBox args={[2.1, 4.25, 0.33]} radius={0.3} smoothness={8} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#0a0f1f"
          metalness={1}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.18}
          envMapIntensity={1.6}
        />
      </RoundedBox>

      {/* glossy screen */}
      <RoundedBox args={[1.82, 3.7, 0.05]} radius={0.22} smoothness={8} position={[0, 0.04, 0.17]}>
        <meshPhysicalMaterial
          color="#04201b"
          emissive={accent}
          emissiveIntensity={0.55}
          metalness={0.4}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.06}
        />
      </RoundedBox>

      {/* chat bubbles on screen */}
      <RoundedBox args={[1.0, 0.4, 0.03]} radius={0.16} smoothness={5} position={[-0.32, 1.0, 0.215]}>
        <meshStandardMaterial color="#a5b4fc" emissive="#6366f1" emissiveIntensity={0.5} roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[1.12, 0.4, 0.03]} radius={0.16} smoothness={5} position={[0.28, 0.32, 0.215]}>
        <meshStandardMaterial color="#9fe6d8" emissive={accent} emissiveIntensity={0.55} roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[0.82, 0.38, 0.03]} radius={0.15} smoothness={5} position={[-0.42, -0.34, 0.215]}>
        <meshStandardMaterial color="#ffd0c4" emissive="#ff7a5c" emissiveIntensity={0.5} roughness={0.5} />
      </RoundedBox>

      {/* camera dot */}
      <mesh position={[0, 1.82, 0.19]}>
        <circleGeometry args={[0.05, 24]} />
        <meshStandardMaterial color="#05070f" metalness={1} roughness={0.2} />
      </mesh>

      {/* call button */}
      <mesh position={[0, -1.5, 0.2]}>
        <circleGeometry args={[0.33, 48]} />
        <meshStandardMaterial color="#ff7a5c" emissive="#ff7a5c" emissiveIntensity={1} />
      </mesh>

      {/* home bar */}
      <RoundedBox args={[0.6, 0.06, 0.02]} radius={0.03} smoothness={3} position={[0, -1.95, 0.205]}>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.5} />
      </RoundedBox>
    </group>
  )
}
