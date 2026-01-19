import React from 'react';
import { Link } from 'react-router-dom';

type NavItem = { label: string; href: string };

export interface NavbarProps {
	items?: NavItem[];
	className?: string;
}

const defaultItems: NavItem[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Work', href: '/work' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ 
	items = defaultItems, 
	className
}) => {
	const navStyle: React.CSSProperties = {
		position: 'fixed',
		top: 16,
		left: '50%',
		transform: 'translateX(-50%)',
		zIndex: 20,
		pointerEvents: 'auto',
		fontFamily: 'Godfried, system-ui, Avenir, Helvetica, Arial, sans-serif',
		background: 'rgba(15, 15, 15, 0.6)',
		backdropFilter: 'blur(10px)',
		WebkitBackdropFilter: 'blur(10px)',
		border: '1px solid rgba(255, 255, 255, 0.08)',
		borderRadius: 9999,
		boxShadow: '0 12px 28px rgba(0,0,0,0.35)',
		padding: 8,
	};
	const ulStyle: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		gap: 8,
		margin: 0,
		padding: 0,
		listStyle: 'none',
	};
	const liStyle: React.CSSProperties = {
		display: 'flex',
	};
	const linkStyle: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: 36,
		padding: 0,
		margin: 0,
		borderRadius: 9999,
		color: '#e9e9e9',
		textDecoration: 'none',
		fontWeight: 600,
		fontSize: 15,
		lineHeight: 1,
		letterSpacing: '0.15px',
		background: 'rgba(255,255,255,0.03)',
		minWidth: 72,
		transition: 'background-color 200ms ease, filter 150ms ease',
	};
	const labelStyle: React.CSSProperties = {
		display: 'inline-block',
		margin: 0,
		padding: 0,
		transform: 'translateY(2px)',
	};

	return (
		<nav aria-label="Primary" style={navStyle} className={className}>
			<ul style={ulStyle}>
				{items.map((item) => (
					<li key={item.href} style={liStyle}>
						<Link
							to={item.href}
							style={linkStyle}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
								e.currentTarget.style.filter = 'brightness(105%)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
								e.currentTarget.style.filter = 'none';
							}}
						>
							<span style={labelStyle}>{item.label}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
