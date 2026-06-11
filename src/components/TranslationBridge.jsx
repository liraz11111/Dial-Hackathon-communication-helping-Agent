import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import Phone3D from './three/Phone3D.jsx'
import SplitFlap from './SplitFlap.jsx'
import LanguagePicker from './LanguagePicker.jsx'
import { Icon } from './ui/Icons.jsx'
import { PHRASES, translatePhrase } from '../lib/phrases.js'
import { listen, speak, micSupported } from '../lib/speech.js'
import { langMeta, isRTL, AGENT_LANGS } from '../lib/languages.js'
import { useStore } from '../store.jsx'

const BRIDGE_LANGS = ['es', 'en', 'he', 'ar', 'ru', 'fr']
const RANDOM_POOL = ['es', 'ar', 'ru', 'fr', 'he']

function Rig({ children }) {
  const ref = useRef()
  useFrame((s) => {
    if (!ref.current) return
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, s.pointer.x * 0.18, 0.05)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -s.pointer.y * 0.1, 0.05)
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
    const a = new THREE.Color('#5eead4')
    const b = new THREE.Color('#ff7a5c')
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
    const speed = bursting ? 0.55 : 0.09
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
      const target = bursting ? 0.95 : 0.28
      matRef.current.opacity += (target - matRef.current.opacity) * 0.12
      matRef.current.size += ((bursting ? 0.16 : 0.085) - matRef.current.size) * 0.12
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
        size={0.085}
        transparent
        opacity={0.28}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

function Scene({ flow, fromLang, toLang }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} />
      <Environment resolution={256}>
        <Lightformer intensity={2} position={[0, 3, 4]} scale={[7, 3, 1]} color="#cdeee6" />
        <Lightformer intensity={1.4} position={[-5, 1, 2]} scale={[3, 4, 1]} color="#a5b4fc" />
        <Lightformer intensity={1.4} position={[5, 1, 2]} scale={[3, 4, 1]} color="#ffb3a0" />
        <Lightformer intensity={1} position={[0, -3, 3]} scale={[7, 2, 1]} color="#23b89c" />
      </Environment>

      <Rig>
        <Float speed={1} rotationIntensity={0.12} floatIntensity={0.5}>
          <Phone3D position={[-3.05, -0.2, 0]} rotation={[0.06, 0.52, 0.06]} scale={0.92} accent="#23b89c" />
        </Float>
        <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.5}>
          <Phone3D position={[3.05, -0.2, 0]} rotation={[0.06, -0.52, -0.06]} scale={0.92} accent="#ff7a5c" />
        </Float>
        <Stream flow={flow} />
      </Rig>

      <ContactShadows position={[0, -2.9, 0]} opacity={0.5} blur={2.8} far={4.5} scale={14} color="#000010" />
    </>
  )
}

function FlagRow({ value, onChange, label, langs = BRIDGE_LANGS }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-20 shrink-0 text-xs font-semibold text-white/45">{label}</span>
      <div className="flex flex-wrap gap-1">
        {langs.map((l) => {
          const m = langMeta(l)
          return (
            <button
              key={l}
              onClick={() => onChange(l)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-base transition ${
                value === l ? 'bg-white/20 ring-1 ring-brand-400' : 'bg-white/5 hover:bg-white/10'
              }`}
              title={m.native}
            >
              {m.flag}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function TranslationBridge() {
  const { user } = useStore()
  const agentDefault = user?.agentLang || 'en'
  const [fromLang, setFromLang] = useState(() => {
    if (user?.language && user.language !== agentDefault) return user.language
    return RANDOM_POOL[Math.floor(Math.random() * RANDOM_POOL.length)]
  })
  const [toLang, setToLang] = useState(agentDefault)
  const [source, setSource] = useState('')
  const [flapText, setFlapText] = useState(() => PHRASES[0][agentDefault] || 'Hello')
  const [flapTrigger, setFlapTrigger] = useState(0)
  const [flow, setFlow] = useState(0)
  const [listening, setListening] = useState(false)
  const [micMsg, setMicMsg] = useState('')
  const recRef = useRef(null)
  const pauseUntil = useRef(0)
  const autoIdx = useRef(0)

  const send = (text) => {
    const value = (text ?? source).trim()
    if (!value) return
    pauseUntil.current = performance.now() + 7000
    const translated = translatePhrase(value, fromLang, toLang)
    setSource(value)
    setFlapText(translated)
    setFlapTrigger((t) => t + 1)
    setFlow((f) => f + 1)
    speak(translated, toLang)
  }

  // Idle auto-demo: keep the board alive by flipping through phrases (no audio)
  // whenever the user isn't interacting.
  useEffect(() => {
    const id = setInterval(() => {
      if (listening || performance.now() < pauseUntil.current) return
      autoIdx.current = (autoIdx.current + 1) % PHRASES.length
      const p = PHRASES[autoIdx.current]
      const src = p[fromLang] || p.en
      setSource(src)
      setFlapText(translatePhrase(src, fromLang, toLang))
      setFlapTrigger((t) => t + 1)
      setFlow((f) => f + 1)
    }, 4200)
    return () => clearInterval(id)
  }, [fromLang, toLang, listening])

  // Re-flip the board whenever either language changes, so the toggles visibly work.
  useEffect(() => {
    const base = source || PHRASES[autoIdx.current][fromLang] || PHRASES[autoIdx.current].en
    setFlapText(translatePhrase(base, fromLang, toLang))
    setFlapTrigger((t) => t + 1)
    setFlow((f) => f + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromLang, toLang])

  const toggleMic = () => {
    if (listening) {
      recRef.current?.stop()
      setListening(false)
      return
    }
    setMicMsg('')
    setListening(true)
    recRef.current = listen(fromLang, {
      onResult: (txt) => setSource(txt),
      onEnd: (final) => {
        setListening(false)
        if (final) send(final)
      },
      onError: (err) => {
        setListening(false)
        setMicMsg(err === 'not-allowed' ? 'Allow microphone access to speak' : 'Mic unavailable — tap a phrase instead')
      },
    })
    if (!recRef.current) {
      setListening(false)
      setMicMsg('Voice input needs Chrome or Edge — tap a phrase instead')
    }
  }

  useEffect(() => () => recRef.current?.stop?.(), [])

  return (
    <section className="relative mx-auto h-[640px] w-full max-w-6xl">
      <Canvas
        className="!absolute inset-0"
        dpr={[1, 2]}
        camera={{ position: [0, 0.4, 9.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <Scene flow={flow} fromLang={fromLang} toLang={toLang} />
        </Suspense>
      </Canvas>

      {/* overlay */}
      <div className="relative z-10 flex h-full flex-col px-4 pb-4 pt-6">
        <div className="text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-brand-200">
            <Icon name="sparkles" className="h-4 w-4" />
            The Living Translation Bridge
          </div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            <span className="text-gradient">Watch your words cross — and hear them land.</span>
          </h2>
        </div>

        {/* split-flap board, centered over the bridge */}
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong w-full max-w-xl rounded-2xl px-4 py-4 text-center shadow-glass"
          >
            <div className="mb-2 flex items-center justify-center gap-2 text-xs font-semibold text-white/50" dir="ltr">
              <span>{langMeta(fromLang).flag} {langMeta(fromLang).native}</span>
              <Icon name="send" className="h-3.5 w-3.5 text-brand-300" />
              <span>{langMeta(toLang).flag} {langMeta(toLang).native}</span>
            </div>
            <SplitFlap text={flapText} trigger={flapTrigger} rtl={isRTL(toLang)} />
            {source && (
              <div className="mt-2 truncate text-[12px] italic text-white/40" dir={isRTL(fromLang) ? 'rtl' : 'ltr'}>
                {source}
              </div>
            )}
          </motion.div>
        </div>

        {/* controls — pick your language, then speak or tap a phrase (no in-app typing) */}
        <div className="glass-strong rounded-2xl p-4">
          <div className="mb-4 grid gap-3 sm:grid-cols-2 sm:items-end">
            <div>
              <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-white/45">You speak</div>
              <LanguagePicker value={fromLang} onChange={setFromLang} up />
            </div>
            <FlagRow value={toLang} onChange={setToLang} label="They hear" langs={AGENT_LANGS} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {micSupported && (
              <button
                onClick={toggleMic}
                className={`flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-bold transition ${
                  listening
                    ? 'mic-live bg-accent-500 text-white'
                    : 'bg-gradient-to-br from-brand-400 to-brand-600 text-ink-900 shadow-glow'
                }`}
              >
                <Icon name="phone" className="h-5 w-5" />
                {listening ? 'Listening…' : 'Tap & speak'}
              </button>
            )}
            <span className="text-sm text-white/45">
              {micSupported ? 'or tap a phrase below' : 'Tap a phrase to send it across'}
            </span>
          </div>

          {micMsg && <div className="mt-2 text-center text-xs text-accent-300">{micMsg}</div>}

          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {PHRASES.map((p) => (
              <button
                key={p.id}
                onClick={() => send(p[fromLang] || p.en)}
                className="rounded-full glass px-3 py-1.5 text-xs text-white/75 transition hover:bg-white/10"
                dir={isRTL(fromLang) ? 'rtl' : 'ltr'}
              >
                {p[fromLang] || p.en}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
