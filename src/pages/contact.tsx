import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Contact: React.FC = () => {
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
		transform: 'translate(-50%, -50%)',
		transition: 'opacity 1s ease-in',
		opacity: 1,
		zIndex: 10,
	};

	return (
		<main style={containerStyle}>
			<Navbar />
			<h1 style={titleStyle}>hello@dvnny.no</h1>
			<Footer />
		</main>
	);
};

export default Contact;
