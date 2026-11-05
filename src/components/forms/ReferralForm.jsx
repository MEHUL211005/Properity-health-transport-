import { useRef, useState } from 'react'
import Field from '../common/Field'
import Icon from '../common/Icon'
import { isEmail, isPhone } from '../../utils/validation'

const steps = [
  { key: 'facility', label: 'Facility', heading: 'Referring facility', copy: 'Tell us where this referral is coming from and who we should coordinate with.' },
  { key: 'patient', label: 'Patient', heading: 'Patient details', copy: 'Share the patient information we need to provide safe, door-to-door transport.' },
  { key: 'schedule', label: 'Schedule', heading: 'Transport schedule', copy: 'Set the dialysis center, start date, and recurring pickup requirements.' },
  { key: 'review', label: 'Review', heading: 'Review & submit', copy: 'Confirm the referral details, add any notes, and authorize transport coordination.' },
]

const stepFields = [
  ['facilityName', 'contactName', 'contactPhone', 'contactEmail'],
  ['firstName', 'lastName', 'address', 'insurance', 'mobility'],
  ['center', 'startDate', 'appointmentTime', 'pickupTime'],
  ['consent'],
]

const requiredMessages = {
  facilityName: 'Enter the referring facility name.',
  contactName: 'Add a contact name.',
  contactPhone: 'Enter a contact phone number.',
  contactEmail: 'Enter a contact email.',
  firstName: "Enter the patient's first name.",
  lastName: "Enter the patient's last name.",
  address: "Enter the patient's home address.",
  insurance: 'Select an insurance type.',
  mobility: 'Select a mobility status.',
  center: 'Enter the dialysis center.',
  startDate: 'Choose a start date.',
  appointmentTime: 'Select an appointment time.',
  pickupTime: 'Select a pickup time.',
  consent: 'Please confirm patient authorization to continue.',
}

const treatmentDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const insuranceOptions = ['Medicare', 'Medicaid', 'Medicare + Medicaid (Dual)', 'Private Insurance', 'Self Pay']
const mobilityOptions = [
  'Ambulatory — walks independently',
  'Ambulatory — uses cane or walker',
  'Requires assistance boarding',
]

const times = Array.from({ length: 22 }, (_, index) => {
  const hour = Math.floor(index / 2) + 4
  const minute = index % 2 ? '30' : '00'
  const suffix = hour < 12 ? 'AM' : 'PM'
  const displayHour = hour > 12 ? hour - 12 : hour
  return `${displayHour}:${minute} ${suffix}`
})

const initialForm = {
  facilityName: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  firstName: '',
  lastName: '',
  address: '',
  insurance: '',
  mobility: '',
  center: '',
  startDate: '',
  appointmentTime: '',
  pickupTime: '',
  days: [],
  notes: '',
  consent: false,
}

function validateValue(name, value) {
  if (name === 'consent') {
    return value ? '' : requiredMessages.consent
  }
  if (!String(value).trim()) {
    return requiredMessages[name]
  }
  if (name === 'contactPhone' && !isPhone(value)) {
    return 'Enter a valid phone number.'
  }
  if (name === 'contactEmail' && !isEmail(value)) {
    return 'Enter a valid email address.'
  }
  return ''
}

export default function ReferralForm() {
  const formRef = useRef(null)
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  function clearFieldError(name) {
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  function updateField(event) {
    const { name, value, type, checked } = event.target
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
    clearFieldError(name)
    setNotice('')
  }

  function toggleDay(day) {
    setFormData((current) => ({
      ...current,
      days: current.days.includes(day)
        ? current.days.filter((item) => item !== day)
        : [...current.days, day],
    }))
    clearFieldError('days')
    setNotice('')
  }

  function collectErrors(index) {
    const next = {}
    stepFields[index].forEach((name) => {
      const message = validateValue(name, formData[name])
      if (message) next[name] = message
    })
    if (index === 2 && formData.days.length === 0) {
      next.days = 'Select at least one treatment day.'
    }
    return next
  }

  function showErrors(next) {
    setErrors(next)
    const first = Object.keys(next)[0]
    if (!first) return
    requestAnimationFrame(() => {
      const field = formRef.current?.querySelector(`[name="${first}"]`)
      field?.focus()
    })
  }

  function goNext() {
    const next = collectErrors(step)
    if (Object.keys(next).length) {
      showErrors(next)
      return
    }
    setErrors({})
    setStep((current) => Math.min(current + 1, steps.length - 1))
  }

  function goBack() {
    setErrors({})
    setStep((current) => Math.max(current - 1, 0))
  }

  function editStep(index) {
    setErrors({})
    setStep(index)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const next = collectErrors(3)
    if (Object.keys(next).length) {
      showErrors(next)
      return
    }
    setErrors({})
    setNotice('This form is a frontend preview and is not connected yet.')
  }

  return (
    <form className="referral-form" onSubmit={handleSubmit} ref={formRef} noValidate>
      <div className="referral-form-head">
        <div>
          <span className="eyebrow">Patient Referral</span>
          <h3>Four steps. One confirmed transport.</h3>
          <p>We confirm every referral within 24 hours and handle Medicare and Medicaid billing directly.</p>
        </div>
        <span className="referral-secure"><Icon name="shield" size={15} /> HIPAA secure</span>
      </div>

      <div className="referral-stepper" aria-label={`Step ${step + 1} of ${steps.length}`}>
        {steps.map((item, index) => (
          <div className={`referral-step ${index === step ? 'is-active' : ''} ${index < step ? 'is-complete' : ''}`} key={item.key}>
            <span className="referral-step-dot">{index < step ? <Icon name="check" size={13} /> : index + 1}</span>
            <span className="referral-step-label">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="referral-step-panel" key={steps[step].key}>
        <div className="referral-step-heading">
          <span>Step {step + 1} of {steps.length}</span>
          <h4>{steps[step].heading}</h4>
          <p>{steps[step].copy}</p>
        </div>

        {step === 0 && (
          <div className="form-grid">
            <Field label="Facility Name" name="facilityName" value={formData.facilityName} onChange={updateField} required error={errors.facilityName} placeholder="DaVita Chamblee" autoComplete="organization" />
            <Field label="Social Worker / Contact" name="contactName" value={formData.contactName} onChange={updateField} required error={errors.contactName} placeholder="Jane Smith" autoComplete="name" />
            <Field label="Contact Phone" name="contactPhone" value={formData.contactPhone} onChange={updateField} required error={errors.contactPhone} placeholder="(404) 000-0000" type="tel" autoComplete="tel" />
            <Field label="Contact Email" name="contactEmail" value={formData.contactEmail} onChange={updateField} required error={errors.contactEmail} placeholder="jsmith@davita.com" type="email" autoComplete="email" />
          </div>
        )}

        {step === 1 && (
          <div className="form-grid">
            <Field label="First Name" name="firstName" value={formData.firstName} onChange={updateField} required error={errors.firstName} placeholder="John" autoComplete="given-name" />
            <Field label="Last Name" name="lastName" value={formData.lastName} onChange={updateField} required error={errors.lastName} placeholder="Smith" autoComplete="family-name" />
            <Field className="field-wide" label="Home Address" name="address" value={formData.address} onChange={updateField} required error={errors.address} placeholder="123 Main St, Atlanta GA 30341" autoComplete="street-address" />
            <SelectField label="Insurance Type" name="insurance" value={formData.insurance} onChange={updateField} error={errors.insurance} options={insuranceOptions} placeholder="Select insurance" />
            <SelectField label="Mobility Status" name="mobility" value={formData.mobility} onChange={updateField} error={errors.mobility} options={mobilityOptions} placeholder="Select mobility" />
          </div>
        )}

        {step === 2 && (
          <div className="form-grid">
            <Field label="Dialysis Center" name="center" value={formData.center} onChange={updateField} required error={errors.center} placeholder="DaVita Chamblee" />
            <Field label="Start Date" name="startDate" value={formData.startDate} onChange={updateField} required error={errors.startDate} type="date" />
            <SelectField label="Appointment Time" name="appointmentTime" value={formData.appointmentTime} onChange={updateField} error={errors.appointmentTime} options={times} placeholder="Select time" />
            <SelectField label="Pickup Time Needed" name="pickupTime" value={formData.pickupTime} onChange={updateField} error={errors.pickupTime} options={times} placeholder="Select time" />
            <div className={`field field-wide days-field ${errors.days ? 'has-error' : ''}`}>
              <span>Treatment Days <b>*</b></span>
              <div className="days-grid">
                {treatmentDays.map((day) => {
                  const selected = formData.days.includes(day)
                  return (
                    <label className={`day-option ${selected ? 'is-selected' : ''}`} key={day}>
                      <input type="checkbox" name="days" checked={selected} onChange={() => toggleDay(day)} aria-invalid={errors.days ? 'true' : undefined} />
                      <span className="day-check"><Icon name="check" size={11} /></span>
                      {day}
                    </label>
                  )
                })}
              </div>
              {errors.days && <span className="field-error" role="alert">{errors.days}</span>}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="referral-review">
            <div className="referral-review-grid">
              <ReviewGroup
                title="Referring facility"
                onEdit={() => editStep(0)}
                items={[
                  ['Facility', formData.facilityName],
                  ['Contact', formData.contactName],
                  ['Phone', formData.contactPhone],
                  ['Email', formData.contactEmail],
                ]}
              />
              <ReviewGroup
                title="Patient details"
                onEdit={() => editStep(1)}
                items={[
                  ['Patient', `${formData.firstName} ${formData.lastName}`.trim()],
                  ['Address', formData.address],
                  ['Insurance', formData.insurance],
                  ['Mobility', formData.mobility],
                ]}
              />
              <ReviewGroup
                title="Transport schedule"
                onEdit={() => editStep(2)}
                items={[
                  ['Dialysis center', formData.center],
                  ['Start date', formData.startDate],
                  ['Appointment', formData.appointmentTime],
                  ['Pickup', formData.pickupTime],
                  ['Days', formData.days.join(', ')],
                ]}
              />
            </div>
            <label className="field">
              <span>Special Notes</span>
              <textarea rows="3" name="notes" value={formData.notes} onChange={updateField} placeholder="Special needs, mobility equipment, notes for driver..." />
            </label>
            <div className="consent-field">
              <label className={`consent ${errors.consent ? 'has-error' : ''}`}>
                <input type="checkbox" name="consent" checked={formData.consent} onChange={updateField} aria-required="true" aria-invalid={errors.consent ? 'true' : undefined} />
                <span>I confirm HIPAA compliance and that this referral is submitted with patient authorization for transportation coordination. <b>*</b></span>
              </label>
              {errors.consent && <span className="field-error" role="alert">{errors.consent}</span>}
            </div>
          </div>
        )}

        {step < 3 && (
          <div className="referral-tip">
            <Icon name="shield" size={15} />
            <span>Patient information is encrypted and HIPAA protected. Every referral is confirmed within 24 hours.</span>
          </div>
        )}
      </div>

      <div className="referral-actions">
        <span className="referral-step-count">Step {step + 1} of {steps.length}</span>
        <div className="referral-action-buttons">
          {step > 0 && <button className="button button-ghost" type="button" onClick={goBack}>Back</button>}
          {step < steps.length - 1
            ? <button className="button button-green" type="button" onClick={goNext}>Continue <Icon name="arrow" size={17} /></button>
            : <button className="button button-green" type="submit">Submit Referral <Icon name="arrow" size={17} /></button>}
        </div>
      </div>

      {notice && <p className="form-notice" role="status">{notice}</p>}
    </form>
  )
}

function SelectField({ label, name, value, onChange, options, placeholder, error }) {
  return (
    <label className={`field ${error ? 'has-error' : ''}`}>
      <span>{label} <b>*</b></span>
      <select name={name} value={value} onChange={onChange} aria-required="true" aria-invalid={error ? 'true' : undefined}>
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      {error && <span className="field-error" role="alert">{error}</span>}
    </label>
  )
}

function ReviewGroup({ title, onEdit, items }) {
  return (
    <div className="review-group">
      <div className="review-group-head">
        <span>{title}</span>
        <button type="button" onClick={onEdit}>Edit</button>
      </div>
      <dl>
        {items.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value || '—'}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
