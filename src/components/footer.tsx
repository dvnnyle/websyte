import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
	const [osloTime, setOsloTime] = useState('');

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const timeString = now.toLocaleTimeString('en-US', {
				timeZone: 'Europe/Oslo',
				hour12: false,
				hour: '2-digit',
				minute: '2-digit'
			});
			setOsloTime(timeString);
		};

		updateTime(); // Initial call
		const interval = setInterval(updateTime, 1000); // Update every second

		return () => clearInterval(interval);
	}, []);

		return (
			<footer className="footer">
				<div className="local-time">
				<div className="time-location">Local time</div>
				<div className="time-display">OSL {osloTime}</div>
				</div>
			<div className="social-links">
				<a href="https://www.linkedin.com/in/danny-nguyen-le-98808221b/" target="_blank" rel="noopener noreferrer" className="social-text">LinkedIn</a>
				<a href="https://instagram.com/dvnnyle/" target="_blank" rel="noopener noreferrer" className="social-text">Instagram</a>
				<a href="https://twitter.com/Dvrcht" target="_blank" rel="noopener noreferrer" className="social-text">Twitter</a>
			</div>
			</footer>
		);
};

export default Footer;