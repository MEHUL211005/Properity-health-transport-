import { useRef, useState } from 'react'
import Field from '../common/Field'
import Icon from '../common/Icon'
import { isEmail, isPhone } from '../../utils/validation'

const initialValues = { name: '', phone: '', email: '', message: '' }

export default function ContactForm() {
  const formRef = useRef(null)
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  function updateField(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
    setNotice('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const next = {}
    if (!values.name.trim()) {
      next.name = 'Please enter your name.'
    }
    if (!values.phone.trim()) {
      next.phone = 'Enter a phone number so we can reach you.'
    } else if (!isPhone(values.phone)) {
      next.phone = 'Enter a valid phone number.'
    }
    if (values.email.trim() && !isEmail(values.email)) {
      next.email = 'Enter a valid email address.'
    }
    if (!values.message.trim()) {
      next.message = 'Tell us how we can help.'
    }
    if (Object.keys(next).length) {
      setErrors(next)
      const first = Object.keys(next)[0]
      requestAnimationFrame(() => {
        formRef.current?.querySelector(`[name="${first}"]`)?.focus()
      })
      return
    }
    setErrors({})
    setNotice('Thanks — your message is ready. This form is a frontend preview and is not connected yet.')
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} ref={formRef} noValidate>
      <div className="contact-form-head">
        <span className="eyebrow">Send a message</span>
        <h3>We reply within one hour.</h3>
        <p>Share a few details and our team will follow up with the next steps.</p>
      </div>
      <div className="contact-form-grid">
        <Field label="Your Name" name="name" value={values.name} onChange={updateField} required error={errors.name} placeholder="Full name" autoComplete="name" />
        <Field label="Phone" name="phone" value={values.phone} onChange={updateField} required error={errors.phone} placeholder="(404) 000-0000" type="tel" autoComplete="tel" />
        <Field className="field-wide" label="Email" name="email" value={values.email} onChange={updateField} error={errors.email} placeholder="you@example.com" type="email" autoComplete="email" />
        <label className={`field field-wide ${errors.message ? 'has-error' : ''}`}>
          <span>Message <b>*</b></span>
          <textarea
            rows="4"
            name="message"
            value={values.message}
            onChange={updateField}
            placeholder="How can we help?"
            aria-required="true"
            aria-invalid={errors.message ? 'true' : undefined}
          />
          {errors.message && <span className="field-error" role="alert">{errors.message}</span>}
        </label>
      </div>
      <button className="button button-green" type="submit">Send Message <Icon name="arrow" size={18} /></button>
      {notice && <p className="form-notice" role="status">{notice}</p>}
    </form>
  )
}
