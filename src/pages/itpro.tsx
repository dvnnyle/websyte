import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import './itpro.css';

const ITPro: React.FC = () => {
  return (
    <div className="itpro-page">
      <Navbar />
      <main className="itpro-main">
        <div className="itpro-content">
          <div className="pdf-viewer">
            <iframe
              src="/portfolio/itPro/itpro.pdf"
              title="MMD-IT Internship Project Document"
              className="pdf-iframe"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ITPro;