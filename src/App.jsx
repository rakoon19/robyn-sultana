import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/CustomCursor';
import ThemeSwitcher from './components/ThemeSwitcher';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import './App.css';

export default function App() {
  return (
    <Router>
        <ScrollToTop />

      <CustomCursor />
      <ThemeSwitcher />
      <div className="flex flex-col min-h-screen bg-bg-primary">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
