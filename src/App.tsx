import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HeroSphere } from './components/HeroSphere'
import Home from './pages/home'
import Contact from './pages/contact'
import About from './pages/about'
import Work from './pages/work'
import ProjectPage from './pages/project';
import ITPro from './pages/itpro';
import NotFound from './pages/notFound';

function AppContent() {
  return (
    <div 
      className="app-container"
      style={{ minHeight: '200vh', position: 'relative' }}
    >
      {/* Persistent HeroSphere background */}
      <HeroSphere />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/itpro" element={<ITPro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
