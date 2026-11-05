import { contact } from '../../data/content'
import Icon from '../common/Icon'

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-inner page-shell">
        <div className="hero-copy">
          <span className="hero-kicker">
            <span /> Atlanta · Non-Emergency Medical Transportation
          </span>
          <h1>
            Dignity in motion.
            <br />
            <em>Every mile of the way.</em>
          </h1>
          <p className="hero-description">
            Wheelchair-accessible, door-to-door transportation for dialysis and medical
            appointments — on time, every time, with the compassion your care deserves.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href="#contact">
              Partner With Us <Icon name="arrow" size={18} />
            </a>
            <a className="button button-outline" href={`tel:${contact.phone}`}>
              <Icon name="phone" size={17} /> Call {contact.phoneDisplay}
            </a>
          </div>
          <div className="hero-assurance">
            <span className="assurance-icon"><Icon name="shield" size={16} /></span>
            <span>Medicare Credentialed</span><i />
            <span>ADA Accessible</span><i />
            <span>HIPAA Compliant</span><i />
            <span>$1.5M Insured</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-photo-frame">
            <img
              className="hero-photo"
              src="/hero-transport.jpg"
              srcSet="/hero-transport-sm.jpg 900w, /hero-transport.jpg 1600w"
              sizes="(max-width: 800px) 92vw, (max-width: 1500px) 46vw, 660px"
              alt="A driver assisting a patient in a wheelchair boarding an accessible medical transport van"
            />
            <span className="hero-photo-shade" aria-hidden="true" />
            <div className="hero-photo-tags">
              <span className="hero-tag"><Icon name="pin" size={14} /> Atlanta Metro</span>
              <span className="hero-tag"><Icon name="clock" size={14} /> 24/7 Dispatch</span>
            </div>
            <div className="hero-glass-card">
              <span className="hero-glass-icon"><Icon name="route" size={19} /></span>
              <div className="hero-glass-copy">
                <strong>Door-to-door care</strong>
                <small>GPS tracked on every mile</small>
              </div>
              <span className="hero-glass-status"><i /> Live</span>
            </div>
          </div>
          <span className="hero-visual-caption">Fulton · DeKalb · Gwinnett</span>
        </div>
      </div>
      <div className="hero-bottom-line" />
    </section>
  )
}
