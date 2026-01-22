import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';

const Work: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [selectedProject, setSelectedProject] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalProject, setModalProject] = useState<string | null>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 50);
		return () => clearTimeout(timer);
	}, []);

	const openModal = (projectId: string) => {
		setModalProject(projectId);
		setIsModalOpen(true);
		document.body.style.overflow = 'hidden'; // Prevent background scroll
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setModalProject(null);
		document.body.style.overflow = 'unset';
	};

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isModalOpen) {
				closeModal();
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [isModalOpen]);

	const projects = [
		{
			id: 'toumao',
			title: 'Toumao',
			description: 'Interactive mindmap and visualization platform',
			category: 'Web Development',
			technologies: ['React', 'TypeScript', 'D3.js', 'Node.js'],
			image: 'src/portfolio/images/mockup.png',
			status: 'In Development'
		}
	];

	const containerStyle: React.CSSProperties = {
		position: 'relative',
		zIndex: 5,
		padding: '20px',
		fontFamily: 'Godfried, system-ui, Avenir, Helvetica, Arial, sans-serif',
	};

	const projectsGridStyle: React.CSSProperties = {
		display: 'flex',
		justifyContent: 'center',
		margin: '100px auto 0',
		padding: '0 20px',
	};

	const projectCardStyle: React.CSSProperties = {
		background: 'rgba(26, 26, 26, 0.7)',
		backdropFilter: 'blur(10px)',
		WebkitBackdropFilter: 'blur(10px)',
		border: '1px solid rgba(255, 255, 255, 0.08)',
		borderRadius: '16px',
		padding: '20px',
		cursor: 'pointer',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
		opacity: isVisible ? 1 : 0,
		overflow: 'hidden',
		boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
		width: '800px',
		position: 'relative',
	};

	const projectImageStyle: React.CSSProperties = {
		width: '100%',
		height: 'auto',
		display: 'block',
		borderRadius: '16px',
	};

	const projectContentStyle: React.CSSProperties = {
		position: 'absolute',
		bottom: '0',
		left: '0',
		right: '0',
		padding: '24px',
		background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
		borderRadius: '0 0 16px 16px',
	};

	const projectTitleStyle: React.CSSProperties = {
		color: '#e9e9e9',
		fontSize: '1.4rem',
		fontWeight: 600,
		marginBottom: '-8px',

	};

	// Modal styles
	const modalOverlayStyle: React.CSSProperties = {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		backdropFilter: 'blur(8px)',
		WebkitBackdropFilter: 'blur(8px)',
		zIndex: 1000,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '20px',
		opacity: isModalOpen ? 1 : 0,
		visibility: isModalOpen ? 'visible' : 'hidden',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
	};

	const modalContentStyle: React.CSSProperties = {
		background: 'rgba(15, 15, 15, 0.95)',
		backdropFilter: 'blur(20px)',
		WebkitBackdropFilter: 'blur(20px)',
		border: '1px solid rgba(255, 255, 255, 0.1)',
		borderRadius: '20px',
		padding: '40px',
		maxWidth: '800px',
		width: '100%',
		maxHeight: '70vh',
		overflowY: 'auto',
		position: 'relative',
		transform: isModalOpen ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
	};

	const closeButtonStyle: React.CSSProperties = {
		position: 'absolute',
		top: '20px',
		right: '20px',
		background: 'rgba(255, 255, 255, 0.1)',
		border: 'none',
		borderRadius: '50%',
		width: '40px',
		height: '40px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		color: '#e9e9e9',
		fontSize: '18px',
		transition: 'all 0.2s ease',
	};

	// Toumao project detailed content
	const ToumaoModal = () => {
		const [currentImageIndex, setCurrentImageIndex] = useState(0);
		
		const projectImages = [
			'src/portfolio/images/mock3.png',
			'src/portfolio/images/Screenshot_14.png',
			'src/portfolio/images/tounao1.png',
			'src/portfolio/images/Screenshot_16.png',
			'src/portfolio/images/t2.png',
		];

		const nextImage = () => {
			setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
		};

		const prevImage = () => {
			setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
		};

		return (
			<div>
				<h2 style={{ 
					color: '#e9e9e9', 
					fontSize: '2.5rem', 
					fontWeight: 600, 
					marginBottom: '20px',
					textShadow: '0 0 20px rgba(233, 233, 233, 0.3)',
				}}>
					Toumao
				</h2>
				<p style={{ 
					color: '#e9e9e9', 
					opacity: 0.8, 
					fontSize: '1.1rem', 
					lineHeight: 1.6, 
					marginBottom: '30px' 
				}}>
					An interactive mindmap and visualization platform that transforms complex data relationships into intuitive, navigable visual networks.
				</p>

				{/* Image Carousel */}
				<div style={{ 
					marginBottom: '40px',
					position: 'relative',
					borderRadius: '12px',
					overflow: 'hidden',
					boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
				}}>
					<img 
						src={projectImages[currentImageIndex]} 
						alt={`Toumao Interface ${currentImageIndex + 1}`}
						style={{ 
							width: '100%', 
							maxHeight: '400px',
							height: 'auto',
							objectFit: 'contain',
							display: 'block',
							backgroundColor: '#1a1a1a'
						}}
					/>
					
					{/* Navigation buttons */}
					{projectImages.length > 1 && (
						<>
							<button
								onClick={prevImage}
								style={{
									position: 'absolute',
									left: '10px',
									top: '50%',
									transform: 'translateY(-50%)',
									background: 'rgba(0, 0, 0, 0.7)',
									border: 'none',
									borderRadius: '50%',
									width: '40px',
									height: '40px',
									color: '#e9e9e9',
									fontSize: '18px',
									cursor: 'pointer',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									transition: 'all 0.2s ease'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
								}}
							>
								←
							</button>
							<button
								onClick={nextImage}
								style={{
									position: 'absolute',
									right: '10px',
									top: '50%',
									transform: 'translateY(-50%)',
									background: 'rgba(0, 0, 0, 0.7)',
									border: 'none',
									borderRadius: '50%',
									width: '40px',
									height: '40px',
									color: '#e9e9e9',
									fontSize: '18px',
									cursor: 'pointer',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									transition: 'all 0.2s ease'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
								}}
							>
								→
							</button>
						</>
					)}
				</div>

			<div style={{ 
				display: 'flex', 
				gap: '15px', 
				justifyContent: 'center',
				flexWrap: 'wrap' 
			}}>
				<a 
					href="https://tounao.dvnny.no/" 
					target="_blank" 
					rel="noopener noreferrer"
					style={{
						background: 'linear-gradient(135deg, #646cff 0%, #5a67d8 100%)',
						color: 'white',
						border: 'none',
						padding: '12px 24px',
						borderRadius: '8px',
						fontWeight: 600,
						cursor: 'pointer',
						transition: 'all 0.2s ease',
						fontSize: '0.95rem',
						textDecoration: 'none',
						display: 'inline-block'
					}}
				>
					Live Demo
				</a>
			</div>
		</div>
	);
};

	return (
		<div style={containerStyle}>
			<Navbar />
			<div style={projectsGridStyle}>
				{projects.map((project, index) => (
					<div 
						key={project.id}
						style={{
							...projectCardStyle,
							transitionDelay: `${index * 0.1}s`,
							transform: selectedProject === project.id ? 'scale(1.02)' : 
								isVisible ? 'translateY(0)' : 'translateY(30px)',
							boxShadow: selectedProject === project.id ? 
								'0 12px 48px rgba(100, 108, 255, 0.3)' : 
								'0 8px 32px rgba(0, 0, 0, 0.4)',
						}}
						onMouseEnter={() => setSelectedProject(project.id)}
						onMouseLeave={() => setSelectedProject(null)}
						onClick={() => project.id === 'toumao' ? openModal(project.id) : null}
					>
						<img 
							src={project.image} 
							alt={project.title}
							style={projectImageStyle}
						/>
						<div style={projectContentStyle}>
							<h3 style={projectTitleStyle}>
								{project.title}
							</h3>
						</div>
					</div>
				))}
			</div>

			{/* Modal */}
			<div style={modalOverlayStyle} onClick={closeModal}>
				<div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
					<button 
						style={closeButtonStyle}
						onClick={closeModal}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
						}}
					>
						<span style={{ transform: 'translateY(3px)' }}>✕</span>
					</button>
					{modalProject === 'toumao' && <ToumaoModal />}
				</div>
			</div>
		</div>
	);
};

export default Work;