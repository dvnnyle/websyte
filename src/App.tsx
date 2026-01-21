import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HeroSphere } from './components/HeroSphere'
import Home from './pages/home'
import Contact from './pages/contact'
import About from './pages/about'
import Work from './pages/work'

function App() {
  return (
    <Router>
      <div style={{ minHeight: '200vh', position: 'relative' }}>
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
