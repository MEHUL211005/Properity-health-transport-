import { counties } from '../../data/content'
import Icon from '../common/Icon'

const serviceAreas = ['Fulton', 'DeKalb', 'Gwinnett', 'Cobb', 'Clayton']

export default function Coverage() {
  return (
    <section className="section coverage-section" id="coverage">
      <div className="page-shell">
        <div className="coverage-heading reveal">
          <div className="coverage-heading-main">
            <span className="eyebrow">Service Area</span>
            <h2>Atlanta Metro<br /><em>Coverage</em></h2>
          </div>
          <div className="coverage-heading-side">
            <p>We serve the three core counties of the Atlanta metropolitan area — covering the region's highest-volume medical facilities and Medicaid population centers.</p>
            <div className="coverage-counties">
              <span className="coverage-counties-label"><Icon name="pin" size={14} /> Counties served</span>
              <div className="coverage-county-list">
                {serviceAreas.map((area, index) => (
                  <span className={index < 3 ? 'is-core' : undefined} key={area}>
                    <i /> {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="coverage-stats reveal">
          <span><strong>03</strong> Core counties</span>
          <span><strong>05</strong> Counties served</span>
          <span><strong>24/7</strong> Dispatch</span>
        </div>
        <div className="county-grid">
          {counties.map((county, index) => (
            <article className="county-card reveal" key={county.name} style={{ '--delay': `${index * 75}ms` }}>
              <span className="county-number">0{index + 1}</span>
              <span className="county-pin"><Icon name="pin" size={18} /></span>
              <h3>{county.name}</h3>
              <span className="county-label">County, Georgia</span>
              <ul>{county.places.map((place) => <li key={place}>{place}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="coverage-note reveal">
          <Icon name="pin" size={15} />
          <span>Based in Chamblee, Georgia — serving facilities across the entire Atlanta metro.</span>
        </div>
      </div>
    </section>
  )
}
