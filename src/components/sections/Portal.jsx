import { contact, nextSteps, referralReasons } from '../../data/content'
import Icon from '../common/Icon'
import ReferralForm from '../forms/ReferralForm'

export default function Portal() {
  return (
    <section className="section portal-section" id="portal">
      <div className="page-shell">
        <div className="portal-heading reveal">
          <div className="portal-heading-main">
            <span className="eyebrow">Dialysis Center Partners</span>
            <h2>Refer Your Patients<br /><em>Online</em></h2>
          </div>
          <div className="portal-heading-side">
            <p>Submit patient transportation requests directly to Prosperity Health Transport. We confirm within 24 hours and handle all Medicare and Medicaid billing.</p>
            <div className="portal-heading-meta">
              <span><Icon name="clock" size={14} /> 24hr confirmation</span>
              <span><Icon name="shield" size={14} /> HIPAA secure</span>
              <span><Icon name="check" size={14} /> $0 patient cost</span>
            </div>
          </div>
        </div>
        <div className="portal-layout">
          <ReferralForm />
          <PortalSidebar />
        </div>
      </div>
    </section>
  )
}

function PortalSidebar() {
  return (
    <aside className="portal-aside">
      <div className="portal-info-card">
        <div className="portal-card-head">
          <span className="portal-card-icon"><Icon name="handshake" size={18} /></span>
          <div>
            <span className="portal-card-kicker">Partner benefits</span>
            <h3>Why Refer to Us</h3>
          </div>
        </div>
        <ul className="check-list">
          {referralReasons.map((reason) => (
            <li key={reason}><span className="check-mark"><Icon name="check" size={11} /></span>{reason}</li>
          ))}
        </ul>
      </div>

      <div className="portal-info-card">
        <div className="portal-card-head">
          <span className="portal-card-icon"><Icon name="clipboard" size={18} /></span>
          <div>
            <span className="portal-card-kicker">Simple process</span>
            <h3>What Happens Next</h3>
          </div>
        </div>
        <ol className="steps-list">
          {nextSteps.map((step, index) => (
            <li key={step}>
              <span className="step-number">{index + 1}</span>
              <span className="step-text">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <UrgentReferral />
    </aside>
  )
}

function UrgentReferral() {
  return (
    <div className="urgent-card">
      <span className="urgent-glow" aria-hidden="true" />
      <div className="urgent-top">
        <span className="urgent-icon"><Icon name="phone" size={19} /></span>
        <span className="urgent-badge">Same-day &amp; next-day</span>
      </div>
      <h3>Urgent Referral?</h3>
      <p>For same-day or next-day transport needs, call our dispatch team directly — we confirm coverage immediately.</p>
      <a className="urgent-phone" href={`tel:${contact.phone}`}><Icon name="phone" size={16} /> {contact.phoneDisplay}</a>
    </div>
  )
}
