import { contact } from '../../data/content'
import Icon from '../common/Icon'
import ContactForm from '../forms/ContactForm'

export default function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="page-shell">
        <div className="contact-heading reveal">
          <div className="contact-heading-inner">
            <div className="contact-heading-main">
              <span className="eyebrow">Get In Touch</span>
              <h2>Contact <em>Us</em></h2>
            </div>
            <div className="contact-heading-side">
              <p>Ready to refer a patient or learn more? We respond within the hour Monday through Saturday and are always available for urgent transport.</p>
              <div className="contact-heading-meta">
                <span><Icon name="clock" size={14} /> Reply within 1 hour</span>
                <span><Icon name="calendar" size={14} /> Mon – Sat</span>
                <span><Icon name="shield" size={14} /> HIPAA secure</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-layout">
          <div className="contact-panel reveal">
            <div className="contact-panel-top">
              <span className="contact-panel-kicker">Direct lines</span>
              <h3>Talk to our dispatch team.</h3>
              <p>For new referrals, scheduling changes, or urgent transport, call us directly and we will confirm coverage immediately.</p>
            </div>

            <a className="contact-panel-phone" href={`tel:${contact.phone}`}>
              <span>24/7 dispatch</span>
              {contact.phoneDisplay}
            </a>

            <div className="contact-rows">
              <div className="contact-row">
                <span className="contact-row-icon"><Icon name="mail" size={16} /></span>
                <div>
                  <span>Email</span>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-row-icon"><Icon name="pin" size={16} /></span>
                <div>
                  <span>Office</span>
                  <p>5211 Peachtree Blvd<br />Chamblee, GA 30341</p>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-row-icon"><Icon name="clock" size={16} /></span>
                <div>
                  <span>Hours</span>
                  <p>Monday — Saturday<br />5:00 AM — 3:00 PM</p>
                </div>
              </div>
            </div>

            <div className="contact-panel-note">
              <Icon name="route" size={15} />
              <span>Door-to-door dialysis transport across the Atlanta Metro.</span>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
