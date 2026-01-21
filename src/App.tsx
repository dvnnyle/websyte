import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HeroSphere } from './components/HeroSphere'
import Home from './pages/home'
import Contact from './pages/contact'

function App() {
  return (
    <Router>
      <div style={{ minHeight: '200vh', position: 'relative' }}>
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
