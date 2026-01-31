import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        width: '100%',
        background: 'none',
        fontFamily: "'JetBrains Mono', monospace"
      }}>
        <div style={{
          background: 'rgba(20, 20, 30, 0.92)',
          border: '1.5px solid rgba(255,255,255,0.08)',
          boxShadow: '0 4px 32px 0 rgba(0,0,0,0.25)',
          borderRadius: '18px',
          padding: '3rem 2.5rem',
          maxWidth: 420,
          width: '100%',
          textAlign: 'center',
          color: '#e0e0e0',
          zIndex: 10
        }}>
          <h1 style={{
            fontSize: '4rem',
            margin: '0 0 1rem 0',
            color: '#e74c3c',
            textShadow: '0 2px 8px #000, 0 1px 0 #fff2'
          }}>404</h1>
          <p style={{
            fontSize: '1.1rem',
            margin: '0 0 2rem 0',
            color: '#e0e0e0',
            textShadow: '0 1px 2px #0008'
          }}>
            Sorry, the page <span style={{ color: '#007bff' }}>{window.location.pathname}</span> doesn’t exist or has been moved.
            <br />
            If you followed an old link or bookmark, it may be from a previous version of this site.
          </p>
          <a href="/" style={{
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1.1rem',
            border: '1px solid #007bff',
            borderRadius: '8px',
            padding: '0.5em 1.5em',
            background: 'rgba(0,0,0,0.12)',
            transition: 'background 0.2s, color 0.2s',
            display: 'inline-block',
            marginTop: '1rem'
          }}
            onMouseOver={e => { e.currentTarget.style.background = '#007bff'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = '#007bff'; }}
          >
            ← Go back home
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
