import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { HeroSphere } from './components/HeroSphere'
import Home from './pages/home'
import Contact from './pages/contact'

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div style={{ 
        minHeight: '200vh', 
        position: 'relative',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 2s ease',
      }}>
        {/* Persistent HeroSphere background */}
        <HeroSphere />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
