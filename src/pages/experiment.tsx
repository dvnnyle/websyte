import React from 'react';
import { PlanetDigital } from '../components/planetdigital';

const Experiment: React.FC = () => {
	return (
		<main className="experiment-page">
			<PlanetDigital />
		</main>
	);
};

export default Experiment;
	return (
		<div className="star-container">
			<svg
				width="160"
				height="160"
				viewBox="0 0 160 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="elongated-star"
			>
				{/* Outer glow layer */}
				<path
					d="M80 20 
					   L86 75 
					   L140 80
					   L86 85 
					   L80 140 
					   L74 85 
					   L20 80
					   L74 75 
					   L80 20 Z"
					fill="url(#starGradient)"
					filter="url(#glow)"
				/>
				
				{/* Inner star layer */}
				<path
					d="M80 30 
					   L84 77 
					   L125 80
					   L84 83 
					   L80 130 
					   L76 83 
					   L35 80
					   L76 77 
					   L80 30 Z"
					fill="url(#innerGradient)"
					opacity="0.9"
				/>
				
				{/* Core highlight */}
				<ellipse cx="80" cy="80" rx="6" ry="6" fill="#FFFFCC" opacity="0.6"/>
				
				{/* SVG Definitions */}
				<defs>
					<radialGradient id="starGradient" cx="50%" cy="50%" r="70%">
						<stop offset="0%" stopColor="#FFE55C" />
						<stop offset="50%" stopColor="#FFD700" />
						<stop offset="100%" stopColor="#FFA500" />
					</radialGradient>
					
					<radialGradient id="innerGradient" cx="50%" cy="50%" r="60%">
						<stop offset="0%" stopColor="#FFFACD" />
						<stop offset="70%" stopColor="#FFE55C" />
						<stop offset="100%" stopColor="#FFD700" />
					</radialGradient>
					
					<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="3" result="coloredBlur"/>
						<feMerge> 
							<feMergeNode in="coloredBlur"/>
							<feMergeNode in="SourceGraphic"/>
						</feMerge>
					</filter>
				</defs>
			</svg>
		</div>
	);
};

const Experiment: React.FC = () => {
	return (
		<main className="experiment-page">
			<FourPointStar />
		</main>
	);
};

export default Experiment;
