import './App.css'
import './index.css'
import Home from './pages/home'
import Experiment from './pages/experiment'

function App() {
  const currentPath = window.location.pathname;
  
  if (currentPath === '/experiment') {
    return <Experiment />;
  }
  
  return <Home />
}

export default App
