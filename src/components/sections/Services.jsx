import { services } from '../../data/content'
import Icon from '../common/Icon'
import Stat from '../common/Stat'

export default function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="page-shell">
        <div className="section-heading section-heading-split reveal">
          <div className="heading-primary">
            <span className="eyebrow">What We Do</span>
            <h2>Dialysis Transportation<br />Services</h2>
          </div>
          <div className="heading-secondary">
            <p>Prosperity Health Transport specializes exclusively in dialysis patient transportation across the Atlanta metropolitan area. We serve ambulatory and wheelchair patients — billing Medicare and Medicaid directly so patients pay absolutely nothing out of pocket. One service. Done with excellence. Every single time.</p>
            <div className="heading-meta">
              <span>Atlanta Metro</span><Icon name="pin" size={13} />
              <span>Medicare &amp; Medicaid</span><Icon name="shield" size={13} />
              <span>6 Days a Week</span><Icon name="clock" size={13} />
            </div>
          </div>
        </div>

        <div className="service-grid">
          {services.map((service, index) => (
            <article className="service-card reveal" key={service.title} style={{ '--delay': `${index * 70}ms` }}>
              <div className="card-top">
                <span className="card-index">0{index + 1}</span>
                <span className="service-badge"><Icon name={service.icon} size={19} /></span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="card-foot">
                <span className="card-note">{service.note}</span>
                {service.href ? <a className="view-link" href={service.href}>View details <Icon name="arrow" size={15} /></a> : null}
              </div>
            </article>
          ))}
        </div>

        <div className="service-stats reveal">
          <Stat value="20" label="Patients Served" animate />
          <Stat value="100%" label="On Time Rate" animate />
          <Stat value="6" label="Days Per Week" animate />
          <Stat value="$0" label="Patient Cost" />
        </div>
      </div>
    </section>
  )
}
