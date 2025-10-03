import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import GoogleReviews from './components/GoogleReviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import Contenido from './components/Contenido';
import Post from './components/Post';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Página principal
  const HomePage = () => (
    <>
      <Hero onContactClick={openModal} />
      <About />
      <Services onContactClick={openModal} />
      <GoogleReviews />
      <Contact />
    </>
  );

  return (
    <Router>
      <div className="font-secondary">
        <Header onContactClick={openModal} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contenido" element={<Contenido />} />
          <Route path="/contenido/:slug" element={<Post />} />
        </Routes>
        <Footer />
        <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </Router>
  );
}

export default App;
