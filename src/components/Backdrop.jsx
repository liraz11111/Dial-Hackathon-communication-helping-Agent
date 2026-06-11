// Fixed, app-wide backdrop: deep base + slowly drifting aurora + film grain.
// Rendered once, behind everything.
export default function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-base" />
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      <div className="grain" />
    </div>
  )
}
