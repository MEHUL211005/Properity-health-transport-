import { standards } from '../../data/content'
import Icon from '../common/Icon'

export default function Standards() {
  return (
    <section className="section standard-section" id="why-us">
      <div className="page-shell">
        <div className="standard-heading reveal">
          <div className="standard-heading-main">
            <span className="eyebrow">Why Choose Us</span>
            <h2>The Prosperity <em>Standard</em></h2>
          </div>
          <div className="standard-heading-side">
            <span className="standard-heading-rule" />
            <span className="standard-heading-count">01 — 06</span>
          </div>
        </div>
        <div className="standard-grid">
          {standards.map(([title, description], index) => (
            <article className="standard-item reveal" key={title} style={{ '--delay': `${index * 55}ms` }}>
              <span className="standard-index">0{index + 1}</span>
              <div className="standard-item-copy">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
        <aside className="standard-pledge reveal">
          <div className="standard-pledge-copy">
            <span className="standard-card-eyebrow">Our Commitment</span>
            <h3>Federally Mandated. <em>Community Driven.</em></h3>
            <p>Under 42 CFR 431.53, states are required to ensure Medicaid beneficiaries have access to transportation to medical appointments. We fulfill that mandate with professionalism, compassion, and reliability that Atlanta's healthcare facilities can depend on.</p>
            <p>Founded by Stefano C. Osuji, PhD — Prosperity Health Transport brings doctoral-level operational discipline to every route, every dispatch, and every patient interaction.</p>
          </div>
          <div className="standard-pledge-side">
            <div className="standard-card-meta">
              <span className="standard-card-seal"><Icon name="shield" size={18} /></span>
              <div><strong>NPI 1194643692</strong><small>Medicare &amp; Medicaid credentialed</small></div>
            </div>
            <a className="button button-gold" href="#contact">Start a Partnership <Icon name="arrow" size={17} /></a>
          </div>
          <div className="card-watermark" aria-hidden="true">P</div>
        </aside>
      </div>
    </section>
  )
}
