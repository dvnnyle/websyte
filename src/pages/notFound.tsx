import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "4rem 2rem", textAlign: "center", minHeight: "60vh", position: 'relative', zIndex: 10, background: 'rgba(255,255,255,0.98)' }}>
        <h1 style={{ fontSize: '5rem', marginBottom: '1rem', color: '#e74c3c' }}>404</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
          Sorry, the page you are looking for (<span style={{ color: '#007bff' }}>{window.location.pathname}</span>) does not exist or has been moved.
          <br />
          If you followed an old link or bookmark, it may be from a previous version of this site.
        </p>
        <a href="/" style={{ color: '#007bff', textDecoration: 'none', fontSize: '1.2rem' }}>
          ← Go back home
        </a>
      </main>
      <Footer />
    </>
  );
}
