import { useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Services from './components/Services';
import GoogleReviews from './components/GoogleReviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="font-secondary">
      <Header onContactClick={openModal} />
      <About />
      <Services />
      <GoogleReviews />
      <Contact />
      <Footer />
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
