import { contact } from '../../data/content'
import Icon from '../common/Icon'

export default function FloatingActions() {
  return (
    <>
      <a className="care-navigator" href="#portal"><span className="navigator-spark">✦</span> Care Navigator <Icon name="arrow" size={14} /></a>
      <a className="mobile-call" href={`tel:${contact.phone}`}><Icon name="phone" size={18} /> Call Now</a>
      <a className="back-top" href="#top" aria-label="Back to top">↑</a>
    </>
  )
}
