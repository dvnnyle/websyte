import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Contact: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
	const [showToast, setShowToast] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: ''
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 50);
		return () => clearTimeout(timer);
	}, []);

	const handleEmailClick = () => {
		setShowForm(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus('idle');

		try {
			// Using environment variables for security
			const result = await emailjs.send(
				import.meta.env.VITE_EMAILJS_SERVICE_ID_PRO,
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
				{
					from_name: formData.name,
					from_email: formData.email,
					message: formData.message,
					to_name: 'Danny', // Replace with your name
				},
				import.meta.env.VITE_EMAILJS_PUBLIC_KEY
			);

			console.log('Email sent successfully:', result);
			setSubmitStatus('success');
			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
			// Reset form after successful submission
			setFormData({ name: '', email: '', message: '' });
		} catch (error) {
			console.error('Email sending failed:', error);
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleBackClick = () => {
		setShowForm(false);
	};

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
		fontSize: 'clamp(2.5rem, 8vw, 4rem)',
		fontWeight: 600,
		letterSpacing: '-0.5px',
		position: 'fixed',
		top: '40%',
		left: '50%',
		transform: (isVisible && !showForm)
			? 'translate(-50%, -50%) translateY(0) scale(1)' 
			: 'translate(-50%, -50%) translateY(20px) scale(0.95)',
		transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
		opacity: (isVisible && !showForm) ? 1 : 0,
		textShadow: (isVisible && !showForm)
			? '0 0 10px rgba(233, 233, 233, 0.6), 0 0 0px rgba(233, 233, 233, 0.3), 0 0 0px rgba(233, 233, 233, 0.1)' 
			: 'none',
		filter: (isVisible && !showForm) ? 'blur(0px)' : 'blur(2px)',
		zIndex: 10,
		cursor: 'pointer',
		pointerEvents: showForm ? 'none' : 'auto',
	};

	const formStyle: React.CSSProperties = {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: showForm
			? 'translate(-50%, -50%) translateY(0) scale(1)' 
			: 'translate(-50%, -50%) translateY(40px) scale(0.8)',
		transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
		opacity: showForm ? 1 : 0,
		filter: showForm ? 'blur(0px)' : 'blur(5px)',
		zIndex: 10,
		width: '90%',
		maxWidth: '500px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '0',
		pointerEvents: showForm ? 'auto' : 'none',
	};

	const inputStyle: React.CSSProperties = {
		width: '100%',
		padding: '15px 18px',
		margin: '8px 0',
		backgroundColor: 'rgba(233, 233, 233, 0.1)',
		border: '1px solid rgba(233, 233, 233, 0.3)',
		borderRadius: '8px',
		color: '#e9e9e9',
		fontSize: '1.1rem',
		fontFamily: 'Godfried, system-ui, Avenir, Helvetica, Arial, sans-serif',
		outline: 'none',
		transition: 'all 0.3s ease',
		boxShadow: '0 0 0 rgba(233, 233, 233, 0.3)',
		boxSizing: 'border-box',
	};

	const textareaStyle: React.CSSProperties = {
		...inputStyle,
		minHeight: '120px',
		resize: 'vertical',
		fontFamily: 'Godfried, system-ui, Avenir, Helvetica, Arial, sans-serif',
	};

	const buttonStyle: React.CSSProperties = {
		width: '100%',
		padding: '17px 20px 15px 20px',
		margin: '24px 0 12px 0',
		backgroundColor: 'rgba(233, 233, 233, 0.1)',
		border: '1px solid rgba(233, 233, 233, 0.5)',
		borderRadius: '8px',
		color: '#e9e9e9',
		fontSize: '1.1rem',
		fontFamily: 'Godfried, system-ui, Avenir, Helvetica, Arial, sans-serif',
		cursor: 'pointer',
		transition: 'all 0.3s ease',
		textShadow: '0 0 5px rgba(233, 233, 233, 0.3)',
		boxSizing: 'border-box',
	};

	const sendingTextStyle: React.CSSProperties = {
		display: 'inline-block',
		animation: 'wave 1.5s ease-in-out infinite',
	};

	const backButtonStyle: React.CSSProperties = {
		width: '35px',
		height: '35px',
		padding: '0',
		margin: '12px auto 0 auto',
		backgroundColor: 'transparent',
		border: '2px solid rgba(233, 233, 233, 0.3)',
		borderRadius: '50%',
		color: '#e9e9e9',
		fontSize: '1.2rem',
		fontFamily: 'Godfried, system-ui, Avenir, Helvetica, Arial, sans-serif',
		cursor: 'pointer',
		transition: 'all 0.3s ease',
		boxSizing: 'border-box',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		lineHeight: '0',
	};

	return (
		<main style={containerStyle}>
			<Navbar />
			
			<style>
				{`
					@keyframes wave {
						0%, 60%, 100% {
							transform: translateY(0);
						}
						30% {
							transform: translateY(-8px);
						}
					}
					
					.wave-text span {
						display: inline-block;
						animation: wave 1.5s ease-in-out infinite;
					}
					
					.wave-text span:nth-child(1) { animation-delay: 0s; }
					.wave-text span:nth-child(2) { animation-delay: 0.1s; }
					.wave-text span:nth-child(3) { animation-delay: 0.2s; }
					.wave-text span:nth-child(4) { animation-delay: 0.3s; }
					.wave-text span:nth-child(5) { animation-delay: 0.4s; }
					.wave-text span:nth-child(6) { animation-delay: 0.5s; }
					.wave-text span:nth-child(7) { animation-delay: 0.6s; }
					.wave-text span:nth-child(8) { animation-delay: 0.7s; }
					.wave-text span:nth-child(9) { animation-delay: 0.8s; }
					.wave-text span:nth-child(10) { animation-delay: 0.9s; }
				`}
			</style>
			
			<h1 style={titleStyle} onClick={handleEmailClick}>
				hello@dvnny.no
			</h1>
			
			<form style={formStyle} onSubmit={handleSubmit}>
					<input
						type="text"
						name="name"
						placeholder="Your Name"
						value={formData.name}
						onChange={handleInputChange}
						style={inputStyle}
						onFocus={(e) => {
							e.target.style.borderColor = 'rgba(233, 233, 233, 0.6)';
							e.target.style.boxShadow = '0 0 10px rgba(233, 233, 233, 0.2)';
						}}
						onBlur={(e) => {
							e.target.style.borderColor = 'rgba(233, 233, 233, 0.3)';
							e.target.style.boxShadow = '0 0 0 rgba(233, 233, 233, 0.3)';
						}}
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="Your Email"
						value={formData.email}
						onChange={handleInputChange}
						style={inputStyle}
						onFocus={(e) => {
							e.target.style.borderColor = 'rgba(233, 233, 233, 0.6)';
							e.target.style.boxShadow = '0 0 10px rgba(233, 233, 233, 0.2)';
						}}
						onBlur={(e) => {
							e.target.style.borderColor = 'rgba(233, 233, 233, 0.3)';
							e.target.style.boxShadow = '0 0 0 rgba(233, 233, 233, 0.3)';
						}}
						required
					/>
					<textarea
						name="message"
						placeholder="Your Message"
						value={formData.message}
						onChange={handleInputChange}
						style={textareaStyle}
						onFocus={(e) => {
							e.target.style.borderColor = 'rgba(233, 233, 233, 0.6)';
							e.target.style.boxShadow = '0 0 10px rgba(233, 233, 233, 0.2)';
						}}
						onBlur={(e) => {
							e.target.style.borderColor = 'rgba(233, 233, 233, 0.3)';
							e.target.style.boxShadow = '0 0 0 rgba(233, 233, 233, 0.3)';
						}}
						required
					/>
					<button
						type="submit"
						style={{
							...buttonStyle,
							opacity: isSubmitting ? 0.7 : 1,
							cursor: isSubmitting ? 'not-allowed' : 'pointer',
						}}
						disabled={isSubmitting}
						onMouseEnter={(e) => {
							if (!isSubmitting) {
								e.currentTarget.style.backgroundColor = 'rgba(233, 233, 233, 0.2)';
								e.currentTarget.style.boxShadow = '0 0 15px rgba(233, 233, 233, 0.3)';
							}
						}}
						onMouseLeave={(e) => {
							if (!isSubmitting) {
								e.currentTarget.style.backgroundColor = 'rgba(233, 233, 233, 0.1)';
								e.currentTarget.style.boxShadow = 'none';
							}
						}}
					>
						{isSubmitting ? (
							<span className="wave-text">
								{Array.from('Sending...').map((char, index) => (
									<span key={index}>{char === ' ' ? '\u00A0' : char}</span>
								))}
							</span>
						) : (
							'Send Message'
						)}
					</button>
					{submitStatus === 'error' && (
						<div style={{
							color: '#f87171',
							margin: '10px 0',
							textAlign: 'center',
							fontSize: '0.9rem',
						}}>
							✗ Failed to send message. Please try again.
						</div>
					)}
					<button
						type="button"
						style={backButtonStyle}
						onClick={handleBackClick}
						onMouseEnter={(e) => {
							e.currentTarget.style.borderColor = 'rgba(233, 233, 233, 0.7)';
							e.currentTarget.style.backgroundColor = 'rgba(233, 233, 233, 0.1)';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.borderColor = 'rgba(233, 233, 233, 0.3)';
							e.currentTarget.style.backgroundColor = 'transparent';
						}}
					>
						<span style={{ transform: 'translateY(3px)' }}>✕</span>
					</button>
				</form>
			
			{showToast && (
				<div className="toast">
					Message sent successfully!
				</div>
			)}
			
			<Footer />
		</main>
	);
};

export default Contact;
