import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Home: React.FC = () => {
	return (
		<main style={{ position: 'relative', zIndex: 5 }}>
			{/* Floating navbar island */}
			<Navbar />
			{/* Footer */}
			<Footer />
		</main>
	);
};

export default Home;
