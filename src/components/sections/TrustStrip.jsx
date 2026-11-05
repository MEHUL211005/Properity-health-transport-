import Stat from '../common/Stat'

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Service information">
      <div className="trust-inner page-shell">
        <Stat value="2.8M" label="Georgia Medicaid Enrollees" animate />
        <Stat value="3" label="Counties Served" animate />
        <Stat value="24/7" label="Dispatch Available" />
        <Stat value="100%" label="HIPAA Compliant" animate />
      </div>
    </section>
  )
}
