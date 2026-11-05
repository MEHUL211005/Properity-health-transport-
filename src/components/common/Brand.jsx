export default function Brand({ light = false, showName = false }) {
  return (
    <a className={`brand ${light ? 'brand-light' : ''}`} href="#top" aria-label="Prosperity Health Transport home">
      <img className="brand-logo" src="/prosperity-logo.png" alt="" />
      {showName && (
        <span className="brand-name" aria-hidden="true">
          <span>Prosperity</span>
          <span className="brand-name-accent">Health</span>
          <span>Transport</span>
        </span>
      )}
    </a>
  )
}
