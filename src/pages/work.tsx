import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Work: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 50);
		return () => clearTimeout(timer);
	}, []);

	const containerStyle: React.CSSProperties = {
		position: 'relative',
		zIndex: 5,
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0 20px',
		fontFamily: 'Godfried, system-ui, Avenir, Helvetica, Arial, sans-serif',
	};

	const titleStyle: React.CSSProperties = {
		color: '#e9e9e9',
		fontSize: '4rem',
		fontWeight: 600,
		letterSpacing: '-0.5px',
		position: 'fixed',
		top: '40%',
		left: '50%',
		transform: isVisible 
			? 'translate(-50%, -50%) translateY(0) scale(1)' 
			: 'translate(-50%, -50%) translateY(20px) scale(0.95)',
		transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
		opacity: isVisible ? 1 : 0,
		textShadow: isVisible 
			? '0 0 10px rgba(233, 233, 233, 0.6), 0 0 0px rgba(233, 233, 233, 0.3), 0 0 0px rgba(233, 233, 233, 0.1)' 
			: 'none',
		filter: isVisible ? 'blur(0px)' : 'blur(2px)',
		zIndex: 10,
	};

	const subtitleStyle: React.CSSProperties = {
		color: '#e9e9e9',
		fontSize: '1.2rem',
		fontWeight: 400,
		letterSpacing: '0.1px',
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: isVisible 
			? 'translate(-50%, -50%) translateY(0) scale(1)' 
			: 'translate(-50%, -50%) translateY(20px) scale(0.95)',
		transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
		opacity: isVisible ? 0.7 : 0,
		filter: isVisible ? 'blur(0px)' : 'blur(2px)',
		zIndex: 10,
	};

	return (
		<main style={containerStyle}>
			<Navbar />
			
			<h1 style={titleStyle}>
				updating
			</h1>
			
			<p style={subtitleStyle}>
				coming soon
			</p>
			
			<Footer />
		</main>
	);
};

export default Work;