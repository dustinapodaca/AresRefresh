import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import SmoothAnchors from './components/SmoothAnchors';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import CapabilityStatement from './pages/CapabilityStatement';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Accessibility from './pages/Accessibility';
import RolePage from './pages/RolePage';
import IndustryPage from './pages/IndustryPage';
import Insights from './pages/Insights';
import InsightPage from './pages/InsightPage';
import CityJobsPage from './pages/CityJobsPage';
import ColoradoSprings from './pages/locations/ColoradoSprings';
import Denver from './pages/locations/Denver';
import Pueblo from './pages/locations/Pueblo';
import Teaming from './pages/Teaming';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SmoothAnchors />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/capability-statement" element={<CapabilityStatement />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />

        {/* Services by role, industries, insights, and jobs by city (2026-10-08) */}
        <Route path="/services/:slug" element={<RolePage />} />
        <Route path="/industries/:slug" element={<IndustryPage />} />
        <Route path="/teaming" element={<Teaming />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<InsightPage />} />
        <Route path="/careers/:city" element={<CityJobsPage />} />

        {/* Service areas */}
        <Route path="/locations/colorado-springs" element={<ColoradoSprings />} />
        <Route path="/locations/denver" element={<Denver />} />
        <Route path="/locations/pueblo" element={<Pueblo />} />

        {/* Policies */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/accessibility" element={<Accessibility />} />

        {/* Catch-all: renders the 404 page for any unmatched path. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
