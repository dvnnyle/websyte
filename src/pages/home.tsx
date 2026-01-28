
import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Seo from '../components/Seo';

const SITE = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

const Home: React.FC = () => {
	return (
		<>
			<Seo
				title="Danny"
				description="An all-rounder who enjoys building, learning, and solving problems. Explore my work, skills, and how to get in touch."
				canonical={`${SITE}/`}
			/>
			<main style={{ position: 'relative', zIndex: 5 }}>
				{/* Floating navbar island */}
				<Navbar />
				{/* Footer */}
				<Footer />
			</main>
		</>
	);
};

export default Home;
