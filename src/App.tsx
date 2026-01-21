import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HeroSphere } from './components/HeroSphere'
import Home from './pages/home'
import Contact from './pages/contact'
import About from './pages/about'
import Work from './pages/work'
import { useState, useEffect } from 'react'

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // Small delay to ensure smooth animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div 
        className={`app-container ${isLoaded ? 'fade-in' : ''}`}
        style={{ minHeight: '200vh', position: 'relative' }}
      >
        {/* Persistent HeroSphere background */}
        <HeroSphere />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
