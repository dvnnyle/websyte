
import React from "react";
import "./project.css";
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const projects = [
	{
		title: "Toumao",
		description: "Interactive mindmap and visualization platform",
		image: "/portfolio/toumao/toumaoNew.png",
		link: "https://tounao.dvnny.no/"
	},
	{
		title: "Mgeko",
		description: "Modern web application with innovative design",
		image: "/portfolio/mgeko/mgekoNew.png",
		link: "https://mgeko.dvnny.no/"
	},
	{
		title: "Scandish",
		description: "PWA app for OCR scanning recipes and making them digital",
		image: "/portfolio/scandish/Sdbg 1.png",
		link: "https://scandish.dvnny.no/"
	},
	{
		title: "Coming Soon",
		description: "New project in development",
		image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
		link: "#"
	},
	{
		title: "Coming Soon",
		description: "New project in development",
		image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80",
		link: "#"
	},
	{
		title: "Coming Soon",
		description: "New project in development",
		image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80",
		link: "#"
	}
];

const appDevelopment = [
	{
		title: "Coming Soon",
		description: "New app in development",
		image: "/portfolio/app1/NOWAY.png",
		link: "#"
	},
	{
		title: "Coming Soon",
		description: "New app in development",
		image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80",
		link: "#"
	},
	{
		title: "Coming Soon",
		description: "New app in development",
		image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80",
		link: "#"
	}
];

const practical = [
	{
		title: "IT Pro",
		description: "IT professional project",
		image: "/portfolio/itPro/itProPewview.png",
		link: "#"
	}
];

const ProjectPage = () => {
	return (
		<>
		<Navbar />
		<section className="projects-section">
			<div className="projects-container">
				{/* Left column: Title and description */}
				<div className="projects-info-column">
					<h1 className="projects-title">
						Projects
					</h1>
					<p className="projects-description">
						A collection of recent work, digital products, and creative explorations.
					</p>
				</div>

				{/* Right column: Project grid (3 columns) */}
				<div className="projects-grid">
					{projects.map((proj, idx) => (
						<a
							key={idx}
							href={proj.link}
							className="project-card"
						>
							<img
								src={proj.image}
								alt={proj.title}
								className="project-image"
							/>
							<div className="project-overlay">
								<h3 className="project-title">
									{proj.title}
								</h3>
								<p className="project-description">
									{proj.description}
								</p>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>

		{/* App Development Section */}
		<section className="projects-section">
			<div className="projects-container">
				{/* Left column: Title and description */}
				<div className="projects-info-column">
					<h1 className="projects-title">
						App Development
					</h1>
					<p className="projects-description">
						Mobile and desktop applications showcasing innovative solutions.
					</p>
				</div>

				{/* Right column: Project grid (3 columns) */}
				<div className="projects-grid">
					{appDevelopment.map((proj, idx) => (
						<a
							key={idx}
							href={proj.link}
							className="project-card"
						>
							<img
								src={proj.image}
								alt={proj.title}
								className="project-image"
							/>
							<div className="project-overlay">
								<h3 className="project-title">
									{proj.title}
								</h3>
								<p className="project-description">
									{proj.description}
								</p>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>

		{/* Practical Section */}
		<section className="projects-section">
			<div className="projects-container">
				{/* Left column: Title and description */}
				<div className="projects-info-column">
					<h1 className="projects-title">
						Practical
					</h1>
					<p className="projects-description">
						Hands-on projects and practical implementations.
					</p>
				</div>

				{/* Right column: Project grid (3 columns) */}
				<div className="projects-grid projects-grid-single">
					{practical.map((proj, idx) => (
						<a
							key={idx}
							href={proj.link}
							className="project-card"
						>
							<img
								src={proj.image}
								alt={proj.title}
								className="project-image"
							/>
							<div className="project-overlay">
								<h3 className="project-title">
									{proj.title}
								</h3>
								<p className="project-description">
									{proj.description}
								</p>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
		<Footer />
		</>
	);
};

export default ProjectPage;
