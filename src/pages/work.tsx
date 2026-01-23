import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';

const Work: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [selectedProject, setSelectedProject] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalProject, setModalProject] = useState<string | null>(null);
	const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const isMobile = windowWidth <= 480;
	const isTablet = windowWidth <= 768 && windowWidth > 480;

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
			image: '/portfolio/toumao/toumaoNew.png',
			status: 'In Development'
		},
		{
			id: 'mgeko',
			title: 'Mgeko',
			description: 'Modern web application with innovative design',
			category: 'Web Development',
			technologies: ['React', 'TypeScript', 'CSS3'],
			image: '/portfolio/mgeko/mgekoNew.png',
			status: 'Completed'
		},
		{
			id: 'scandish',
			title: 'Scandish',
			description: 'PWA app for OCR scanning recipes and making them digital',
			category: 'Mobile Development',
			technologies: ['React', 'PWA', 'OCR', 'TypeScript'],
			image: '/portfolio/scandish/Sdbg 1.png',
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
		flexDirection: 'column',
		alignItems: 'center',
		gap: isMobile ? '20px' : isTablet ? '30px' : '40px',
		margin: isMobile ? '40px auto 0' : isTablet ? '60px auto 0' : '100px auto 0',
		padding: isMobile ? '0 10px' : isTablet ? '0 15px' : '0 20px',
		maxWidth: '1200px',
	};

	const projectCardStyle: React.CSSProperties = {
		background: 'rgba(26, 26, 26, 0.7)',
		backdropFilter: 'blur(10px)',
		WebkitBackdropFilter: 'blur(10px)',
		border: '1px solid rgba(255, 255, 255, 0.08)',
		borderRadius: isMobile ? '12px' : '16px',
		padding: isMobile ? '12px' : isTablet ? '16px' : '20px',
		cursor: 'pointer',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
		opacity: isVisible ? 1 : 0,
		overflow: 'hidden',
		boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
		width: '100%',
		maxWidth: isMobile ? '95vw' : isTablet ? '90vw' : '800px',
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
		bottom: isMobile ? '8px' : isTablet ? '12px' : '18px',
		left: isMobile ? '8px' : isTablet ? '12px' : '20px',
		right: isMobile ? '8px' : isTablet ? '12px' : '20px',
		padding: isMobile ? '4px 8px' : isTablet ? '6px 12px' : '12px 24px',
		background: 'rgba(0, 0, 0, 0.05)',
		backdropFilter: 'blur(12px)',
		WebkitBackdropFilter: 'blur(12px)',
		border: '1px solid rgba(255, 255, 255, 0.1)',
		borderRadius: isMobile ? '6px' : isTablet ? '10px' : '16px',
		boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.3)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	};

	const projectTitleStyle: React.CSSProperties = {
		color: '#e9e9e9',
		fontSize: isMobile ? '1rem' : isTablet ? '1.2rem' : '1.4rem',
		fontWeight: 600,
		margin: 0,
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
		borderRadius: isMobile ? '12px' : isTablet ? '16px' : '20px',
		padding: isMobile ? '20px 15px' : isTablet ? '30px 20px' : '40px',
		maxWidth: '800px',
		width: '100%',
		maxHeight: isMobile ? '90vh' : isTablet ? '80vh' : '70vh',
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

	// Mgeko project detailed content
	const MgekoModal = () => {
		const [currentImageIndex, setCurrentImageIndex] = useState(0);
		const [isLoading, setIsLoading] = useState(true);
		
		const projectImages = [
			'/portfolio/mgeko/mgeko vid.mp4',
			'/portfolio/images/mgekopreview.png',
			'/portfolio/mgeko/home.png',
			'/portfolio/mgeko/browse.png',
			'/portfolio/mgeko/bookmarks.png',
			'/portfolio/mgeko/mgeko_read.png',
			'/portfolio/mgeko/mgeko_viewer.png',
		];

		const nextImage = () => {
			setIsLoading(true);
			setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
		};

		const prevImage = () => {
			setIsLoading(true);
			setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
		};

		const currentItem = projectImages[currentImageIndex];
		const isVideo = currentItem.endsWith('.mp4');

		const skeletonStyle: React.CSSProperties = {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '400px',
			background: 'linear-gradient(90deg, rgba(26, 26, 26, 0.8) 25%, rgba(40, 40, 40, 0.8) 50%, rgba(26, 26, 26, 0.8) 75%)',
			backgroundSize: '200% 100%',
			animation: 'shimmer 2s infinite',
			display: isLoading ? 'block' : 'none',
			zIndex: 2,
			borderRadius: '12px',
		};

		useEffect(() => {
			const style = document.createElement('style');
			style.textContent = `
				@keyframes shimmer {
					0% { background-position: -200% 0; }
					100% { background-position: 200% 0; }
				}
			`;
			document.head.appendChild(style);
			return () => {
				document.head.removeChild(style);
			};
		}, []);

		return (
			<div>
				<h2 style={{ 
					color: '#e9e9e9', 
					fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
					fontWeight: 600, 
					marginBottom: 'clamp(12px, 3vw, 20px)',
					textShadow: '0 0 20px rgba(233, 233, 233, 0.3)',
				}}>
					Mgeko
				</h2>
				<p style={{ 
					color: '#e9e9e9', 
					opacity: 0.8, 
					fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', 
					lineHeight: 1.6, 
					marginBottom: 'clamp(20px, 4vw, 30px)'
				}}>
					A modern web application showcasing innovative design patterns and user experience principles.
				</p>

				{/* Image/Video Carousel */}
				<div style={{ 
					marginBottom: '40px',
					position: 'relative',
					borderRadius: '12px',
					overflow: 'hidden',
					boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
				}}>
					<div style={skeletonStyle} />
					{isVideo ? (
						<video 
							src={currentItem}
							autoPlay
							muted
							loop
							controls
							onLoadedData={() => setIsLoading(false)}
							style={{ 
								width: '100%', 
								maxHeight: '400px',
								height: 'auto',
								objectFit: 'contain',
								display: 'block',
								backgroundColor: '#1a1a1a',
								opacity: isLoading ? 0 : 1,
								transition: 'opacity 0.3s ease'
							}}
						/>
					) : (
						<img 
							src={currentItem} 
							alt={`Mgeko Interface ${currentImageIndex + 1}`}
							onLoad={() => setIsLoading(false)}
							style={{ 
								width: '100%', 
								maxHeight: '400px',
								height: 'auto',
								objectFit: 'contain',
								display: 'block',
								backgroundColor: '#1a1a1a',
								opacity: isLoading ? 0 : 1,
								transition: 'opacity 0.3s ease'
							}}
						/>
					)}
					
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
								<span style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									lineHeight: 1,
									fontSize: '16px',
									transform: 'translateY(-1px)'
								}}>◀</span>
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
								<span style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									lineHeight: 1,
									fontSize: '16px',
									transform: 'translateY(-1px)'
								}}>▶</span>
							</button>
						</>
					)}
				</div>

				<div style={{ 
					display: 'flex', 
					flexDirection: 'column',
					gap: '10px', 
					alignItems: 'center' 
				}}>
					<a 
						href="https://mgeko.dvnny.no/" 
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
						check it out
					</a>
					<p style={{
						color: '#e9e9e9',
						opacity: 0.6,
						fontSize: '0.8rem',
						margin: 0,
						fontStyle: 'italic'
					}}>
						Might be buggy
					</p>
				</div>
			</div>
		);
	};

	// Toumao project detailed content
	const ToumaoModal = () => {
		const [currentImageIndex, setCurrentImageIndex] = useState(0);
		const [isLoading, setIsLoading] = useState(true);
		
		const projectImages = [
			'/portfolio/images/mock3.png',
			'/portfolio/images/Screenshot_14.png',
			'/portfolio/images/tounao1.png',
			'/portfolio/images/Screenshot_16.png',
			'/portfolio/images/t2.png',
		];

		const nextImage = () => {
			setIsLoading(true);
			setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
		};

		const prevImage = () => {
			setIsLoading(true);
			setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
		};

		const skeletonStyle: React.CSSProperties = {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '400px',
			background: 'linear-gradient(90deg, rgba(26, 26, 26, 0.8) 25%, rgba(40, 40, 40, 0.8) 50%, rgba(26, 26, 26, 0.8) 75%)',
			backgroundSize: '200% 100%',
			animation: 'shimmer 2s infinite',
			display: isLoading ? 'block' : 'none',
			zIndex: 2,
			borderRadius: '12px',
		};

		return (
			<div>
				<h2 style={{ 
					color: '#e9e9e9', 
					fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
					fontWeight: 600, 
					marginBottom: 'clamp(12px, 3vw, 20px)',
					textShadow: '0 0 20px rgba(233, 233, 233, 0.3)',
				}}>
					Toumao
				</h2>
				<p style={{ 
					color: '#e9e9e9', 
					opacity: 0.8, 
					fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', 
					lineHeight: 1.6, 
					marginBottom: 'clamp(20px, 4vw, 30px)'
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
					<div style={skeletonStyle} />
					<img 
						src={projectImages[currentImageIndex]} 
						alt={`Toumao Interface ${currentImageIndex + 1}`}
						onLoad={() => setIsLoading(false)}
						style={{ 
							width: '100%', 
							maxHeight: '400px',
							height: 'auto',
							objectFit: 'contain',
							display: 'block',
							backgroundColor: '#1a1a1a',
							opacity: isLoading ? 0 : 1,
							transition: 'opacity 0.3s ease'
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
								<span style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									lineHeight: 1,
									fontSize: '16px',
									transform: 'translateY(-1px)'
								}}>◀</span>
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
								<span style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									lineHeight: 1,
									fontSize: '16px',
									transform: 'translateY(-1px)'
								}}>▶</span>
							</button>
						</>
					)}
				</div>

			<div style={{ 
				display: 'flex', 
				flexDirection: 'column',
				gap: '10px', 
				alignItems: 'center' 
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
					check it out
				</a>
				<p style={{
					color: '#e9e9e9',
					opacity: 0.6,
					fontSize: '0.8rem',
					margin: 0,
					fontStyle: 'italic'
				}}>
					might be buggy under
				</p>
			</div>
		</div>
	);
};

	// Scandish project detailed content
	const ScandishModal = () => {
		const [currentImageIndex, setCurrentImageIndex] = useState(0);
		const [isLoading, setIsLoading] = useState(true);
		
		const projectImages = [
			'/portfolio/scandish/Sdbg 1.png',
			'/portfolio/scandish/sdPho 1.png',
			'/portfolio/scandish/qr kode.png',
		];

		const nextImage = () => {
			setIsLoading(true);
			setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
		};

		const prevImage = () => {
			setIsLoading(true);
			setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
		};

		const skeletonStyle: React.CSSProperties = {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '400px',
			background: 'linear-gradient(90deg, rgba(26, 26, 26, 0.8) 25%, rgba(40, 40, 40, 0.8) 50%, rgba(26, 26, 26, 0.8) 75%)',
			backgroundSize: '200% 100%',
			animation: 'shimmer 2s infinite',
			display: isLoading ? 'block' : 'none',
			zIndex: 2,
			borderRadius: '12px',
		};

		return (
			<div>
				<h2 style={{ 
					color: '#e9e9e9', 
					fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
					fontWeight: 600, 
					marginBottom: 'clamp(12px, 3vw, 20px)',
					textShadow: '0 0 20px rgba(233, 233, 233, 0.3)',
				}}>
					Scandish
				</h2>
				<p style={{ 
					color: '#e9e9e9', 
					opacity: 0.8, 
					fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', 
					lineHeight: 1.6, 
					marginBottom: 'clamp(20px, 4vw, 30px)'
				}}>
					A Progressive Web App that uses OCR technology to scan physical recipes and convert them into digital format. Features include recipe scanning, ingredient recognition, and digital recipe management.
				</p>

				{/* Image Carousel */}
				<div style={{ 
					marginBottom: '40px',
					position: 'relative',
					borderRadius: '12px',
					overflow: 'hidden',
					boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
				}}>
					<div style={skeletonStyle} />
					<img 
						src={projectImages[currentImageIndex]} 
						alt={`Scandish Interface ${currentImageIndex + 1}`}
						onLoad={() => setIsLoading(false)}
						style={{ 
							width: '100%', 
							maxHeight: '400px',
							height: 'auto',
							objectFit: 'contain',
							display: 'block',
							backgroundColor: '#1a1a1a',
							opacity: isLoading ? 0 : 1,
							transition: 'opacity 0.3s ease'
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
								<span style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									lineHeight: 1,
									fontSize: '16px',
									transform: 'translateY(-1px)'
								}}>◀</span>
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
								<span style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									lineHeight: 1,
									fontSize: '16px',
									transform: 'translateY(-1px)'
								}}>▶</span>
							</button>
						</>
					)}
				</div>

				<div style={{ 
					display: 'flex', 
					flexDirection: 'column',
					gap: '10px', 
					alignItems: 'center' 
				}}>
					<a 
						href="https://scandish.dvnny.no/" 
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
						check it out
					</a>
					<p style={{
						color: '#e9e9e9',
						opacity: 0.6,
						fontSize: '0.8rem',
						margin: 0,
						fontStyle: 'italic'
					}}>
						might be buggy under
					</p>
				</div>
			</div>
		);
	};

	return (
		<div id="work-container" className="work-container" style={containerStyle}>
			<Navbar />
			<div id="projects-grid" className="projects-grid" style={projectsGridStyle}>
				{projects.map((project, index) => (
					<div 
						id={`project-${project.id}`}
						className={`project-card project-${project.id}`}
						key={project.id}
						style={{
							...projectCardStyle,
							transitionDelay: `${index * 0.1}s`,
							transform: selectedProject === project.id ? 'scale(1.02)' : 
								isVisible ? 'translateY(0)' : 'translateY(30px)',
							boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
						}}
						onMouseEnter={() => setSelectedProject(project.id)}
						onMouseLeave={() => setSelectedProject(null)}
						onClick={() => ['toumao', 'mgeko', 'scandish'].includes(project.id) ? openModal(project.id) : null}
					>
						<img 
							id={`${project.id}-image`}
							className="project-image"
							src={project.image} 
							alt={project.title}
							style={projectImageStyle}
						/>
						<div id={`${project.id}-content`} className="project-content" style={projectContentStyle}>
							<h3 id={`${project.id}-title`} className="project-title" style={projectTitleStyle}>
								{project.title}
							</h3>
						</div>
					</div>
				))}
			</div>

			{/* Modal */}
			<div id="modal-overlay" className="modal-overlay" style={modalOverlayStyle} onClick={closeModal}>
				<div id="modal-content" className="modal-content" style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
					<button 
						id="modal-close"
						className="modal-close-button"
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
					{modalProject === 'mgeko' && <MgekoModal />}
					{modalProject === 'scandish' && <ScandishModal />}
				</div>
			</div>
		</div>
	);
};

export default Work;