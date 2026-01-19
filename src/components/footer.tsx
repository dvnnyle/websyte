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
					<span className="social-text">LinkedIn</span>
					<span className="social-text">Instagram</span>
					<span className="social-text">Twitter</span>
				</div>
			</footer>
		);
};

export default Footer;
