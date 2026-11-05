import Brand from '../common/Brand'
import { contact, footerServices } from '../../data/content'

const coverageLinks = ['DeKalb County', 'Fulton County', 'Gwinnett County', 'Chamblee', 'Decatur']

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-main">
          <div className="footer-about">
            <Brand light />
            <span className="eyebrow">Built On Excellence</span>
            <p>Atlanta's dedicated dialysis transportation provider. Medicare and Medicaid credentialed. NPI 1194643692.</p>
            <div className="footer-credentials">
              <span>EIN: 42-3586120</span>
              <span>NPI: 1194643692</span>
              <span>Georgia LLC: 26152983</span>
            </div>
          </div>
          <FooterLinks title="Services" links={footerServices} href="#services" />
          <FooterLinks title="Coverage" links={coverageLinks} href="#coverage" />
          <div className="footer-column footer-contact">
            <span className="eyebrow">Contact</span>
            <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <span>5211 Peachtree Blvd<br />Chamblee, GA 30341</span>
            <span>Mon-Sat · 5AM-3PM</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Prosperity Health Transport LLC · Chamblee, Georgia</span>
          <span>Medicare Credentialed · HIPAA Compliant · ADA Accessible</span>
        </div>
      </div>
    </footer>
  )
}

function FooterLinks({ title, links, href }) {
  return (
    <div className="footer-column">
      <span className="eyebrow">{title}</span>
      {links.map((link) => <a href={href} key={link}>{link}</a>)}
    </div>
  )
}
