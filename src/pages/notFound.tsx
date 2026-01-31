import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "4rem 2rem", textAlign: "center", minHeight: "60vh" }}>
        <h1 style={{ fontSize: '5rem', marginBottom: '1rem', color: '#e74c3c' }}>404</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
          Oops! This page doesn’t exist or has been moved.
        </p>
        <a href="/" style={{ color: '#007bff', textDecoration: 'none', fontSize: '1.2rem' }}>
          ← Go back home
        </a>
      </main>
      <Footer />
    </>
  );
}
