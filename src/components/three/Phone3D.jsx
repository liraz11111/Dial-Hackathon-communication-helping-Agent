import { RoundedBox } from '@react-three/drei'

// A premium phone: titanium-ish metal frame + dark glossy glass screen that
// mirrors the scene environment (the accent shows as glow, not a flat fill).
export default function Phone3D({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, accent = '#23b89c' }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* metal frame */}
      <RoundedBox args={[2.08, 4.24, 0.34]} radius={0.36} smoothness={10}>
        <meshPhysicalMaterial color="#10162a" metalness={1} roughness={0.34} clearcoat={1} clearcoatRoughness={0.28} envMapIntensity={1.5} />
      </RoundedBox>

      {/* dark glossy glass screen (reflects the environment) */}
      <RoundedBox args={[1.82, 3.78, 0.05]} radius={0.3} smoothness={10} position={[0, 0, 0.17]}>
        <meshPhysicalMaterial
          color="#04060e"
          emissive={accent}
          emissiveIntensity={0.12}
          metalness={0.6}
          roughness={0.06}
          clearcoat={1}
          clearcoatRoughness={0.04}
          envMapIntensity={2.1}
          reflectivity={1}
        />
      </RoundedBox>

      {/* dynamic-island pill */}
      <RoundedBox args={[0.52, 0.13, 0.02]} radius={0.06} smoothness={5} position={[0, 1.62, 0.205]}>
        <meshStandardMaterial color="#05070f" metalness={0.8} roughness={0.3} />
      </RoundedBox>

      {/* refined chat bubbles (subtle glass + low glow) */}
      <RoundedBox args={[0.92, 0.34, 0.03]} radius={0.16} smoothness={6} position={[-0.34, 0.66, 0.205]}>
        <meshPhysicalMaterial color="#aeb6e8" emissive="#6366f1" emissiveIntensity={0.28} roughness={0.35} clearcoat={0.6} transmission={0.15} />
      </RoundedBox>
      <RoundedBox args={[1.0, 0.34, 0.03]} radius={0.16} smoothness={6} position={[0.28, 0.02, 0.205]}>
        <meshPhysicalMaterial color="#bdeee4" emissive={accent} emissiveIntensity={0.32} roughness={0.35} clearcoat={0.6} transmission={0.15} />
      </RoundedBox>
      <RoundedBox args={[0.72, 0.3, 0.03]} radius={0.14} smoothness={6} position={[-0.44, -0.6, 0.205]}>
        <meshPhysicalMaterial color="#f0d4cb" emissive="#ff7a5c" emissiveIntensity={0.26} roughness={0.4} clearcoat={0.6} transmission={0.15} />
      </RoundedBox>

      {/* glowing call button */}
      <mesh position={[0, -1.46, 0.2]}>
        <circleGeometry args={[0.32, 48]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.1} toneMapped={false} />
      </mesh>

      {/* home indicator */}
      <RoundedBox args={[0.58, 0.05, 0.02]} radius={0.025} smoothness={3} position={[0, -1.92, 0.205]}>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.4} />
      </RoundedBox>
    </group>
  )
}
