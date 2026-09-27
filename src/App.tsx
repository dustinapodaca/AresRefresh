import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import CapabilityStatement from './pages/CapabilityStatement';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ColoradoSprings from './pages/locations/ColoradoSprings';
import Denver from './pages/locations/Denver';
import Pueblo from './pages/locations/Pueblo';
import ArmedSecurity from './pages/services/ArmedSecurity';
import UnarmedSecurity from './pages/services/UnarmedSecurity';
import MobilePatrol from './pages/services/MobilePatrol';
import EventSecurity from './pages/services/EventSecurity';
import EscortSecurity from './pages/services/EscortSecurity';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/capability-statement" element={<CapabilityStatement />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />

        {/* Service areas */}
        <Route path="/locations/colorado-springs" element={<ColoradoSprings />} />
        <Route path="/locations/denver" element={<Denver />} />
        <Route path="/locations/pueblo" element={<Pueblo />} />

        {/* Service detail */}
        <Route path="/services/armed-security" element={<ArmedSecurity />} />
        <Route path="/services/unarmed-security" element={<UnarmedSecurity />} />
        <Route path="/services/mobile-patrol" element={<MobilePatrol />} />
        <Route path="/services/event-security" element={<EventSecurity />} />
        <Route path="/services/escort-security" element={<EscortSecurity />} />

        {/* Catch-all: renders the 404 page for any unmatched path. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
