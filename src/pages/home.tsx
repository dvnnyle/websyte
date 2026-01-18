import React from 'react';
import { HeroSphere } from '../components/HeroSphere';
import Navbar from '../components/navbar';

const Home: React.FC = () => {
	return (
		<main style={{ minHeight: '200vh', position: 'relative' }}>
			{/* Floating navbar island */}
			<Navbar />
			{/* Fixed overlay sphere hero */}
			<HeroSphere />
		</main>
	);
};

export default Home;
