import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
	const [osloTime, setOsloTime] = useState('');
	const [showToast, setShowToast] = useState(false);
	const [is24Hour, setIs24Hour] = useState(true);

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const timeString = now.toLocaleTimeString('en-US', {
				timeZone: 'Europe/Oslo',
				hour12: !is24Hour,
				hour: '2-digit',
				minute: '2-digit'
			});
			setOsloTime(timeString);
		};

		updateTime(); // Initial call
		const interval = setInterval(updateTime, 1000); // Update every second

		return () => clearInterval(interval);
	}, [is24Hour]);

	const copyEmail = () => {
		navigator.clipboard.writeText('hello@dvnny.no');
		setShowToast(true);
		setTimeout(() => setShowToast(false), 2000);
	};

	const toggleTimeFormat = () => {
		setIs24Hour(!is24Hour);
	};

		return (
			<footer className="footer">
				<div className="local-time">
					<div className="time-location">Local time</div>
					<div className="time-display clickable-time" onClick={toggleTimeFormat}>OSL {osloTime}</div>
				</div>
				<div className="reach-me">
					<div className="time-location">Reach me</div>
					<div className="time-display">
						<span className="email-text" onClick={copyEmail}>
							hello@dvnny.no
						</span>
					</div>
				</div>
				<div className="social-links">
					<a href="https://www.linkedin.com/in/danny-nguyen-le-98808221b/" target="_blank" rel="noopener noreferrer" className="social-text">LinkedIn</a>
					<a href="https://instagram.com/dvnnyle/" target="_blank" rel="noopener noreferrer" className="social-text">Instagram</a>
					<a href="https://twitter.com/Dvrcht" target="_blank" rel="noopener noreferrer" className="social-text">Twitter</a>
				</div>
				{showToast && (
					<div className="toast">
						Email copied to clipboard!
					</div>
				)}
			</footer>
		);
};

export default Footer;