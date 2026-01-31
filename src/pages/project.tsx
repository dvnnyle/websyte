
import "./project.css";
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useSeo } from '../components/Seo';
import { useState, useEffect } from 'react';
import ProjectCardSkeleton from '../components/ProjectCardSkeleton';

const SITE = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

const projects = [
	{
		title: "Playworld Website",
		description: "Design example",
		image: "/portfolio/playworld/playworldPreview.png",
		link: "https://coyote.dvnny.no/",
		status: "In Development"
	},
	{
		title: "Playworld PWA",
		description: "Progressive web application",
		image: "/portfolio/app1/appPreviewPW.png",
		link: "#",
		status: "In Development"
	},
	{
		title: "PureNorway Water",
		description: "Concept design for new website for PureNorway Water",
		image: "/portfolio/pureNorway/pureNorway.png",
		link: "https://water.dvnny.no/",
		status: "Concept"
	}
];

const appDevelopment = [
	{
		title: "HomeAbroad",
		description: "Mobile application project",
		image: "/portfolio/app1/NOWAY.png",
		link: "https://www.figma.com/proto/Q2TrlGE2Qwl3wF3n0da9SO/HomeAbroad?node-id=15-59&p=f&t=GJkJ39xu2iSBQ8P7-1&scaling=scale-down&content-scaling=fixed&page-id=15%3A57&starting-point-node-id=15%3A59&show-proto-sidebar=1"
	},
	{
		title: "Scandish",
		description: "PWA app for OCR scanning recipes and making them digital",
		image: "/portfolio/scandish/Sdbg 1.png",
		link: "https://scandish.dvnny.no/"
	},
	{
		title: "Playworld PWA",
		description: "Progressive web application",
		image: "/portfolio/app1/appPreviewPW.png",
		link: "#",
		status: "In Development"
	}
];

const practical = [
	{
		title: "MMD-IT Internship",
		description: "Multimedia project",
		image: "/portfolio/itPro/itProPewview.png",
		link: "/itpro"
	}
];

const desktopWebApps = [
	{
		title: "Smite Pomodoro",
		description: "Beautiful productivity timer with focus sessions and ambient features",
		image: "/portfolio/smite/smitePomodoro.png",
		link: "https://smite.dvnny.no"
	},
	{
		title: "Toumao",
		description: "Interactive mindmap and visualization platform",
		image: "/portfolio/toumao/toumaoNew.png",
		link: "https://tounao.dvnny.no/"
	},
	{
		title: "PureNorway Water",
		description: "Concept design for new website for PureNorway Water",
		image: "/portfolio/pureNorway/pureNorway.png",
		link: "https://water.dvnny.no/",
		status: "Concept"
	},
	{
		title: "Playworld Website",
		description: "Design example",
		image: "/portfolio/playworld/playworldPreview.png",
		link: "https://coyote.dvnny.no/",
		status: "In Development"
	},
	{
		title: "Mgeko",
		description: "Modern web application with innovative design",
		image: "/portfolio/mgeko/mgekoNew.png",
		link: "https://mgeko.dvnny.no/"
	},
	{
		title: "Scandish Website",
		description: "Website for Scandish",
		image: "/portfolio/scandish/scandishWeb.png",
		link: "#"
	}
];

const ProjectPage = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate loading time for images and content
		const timer = setTimeout(() => {
			setLoading(false);
		}, 800);
		return () => clearTimeout(timer);
	}, []);

	useSeo({
		title: "Projects | Danny Nguyen Le",
		description: "A closer look at a project — how it was built, what was learned, and the ideas behind the work.",
		canonical: `${SITE}/project`,
	});
	return (
		<>
			<Navbar />
			<section className="projects-section">
				<div className="projects-container">
					{/* Left column: Title and description */}
					<div className="projects-info-column">
						<h1 className="projects-title">
							Ongoing Projects
						</h1>
						<p className="projects-description">
							A collection of recent work, digital products, and creative explorations.
						</p>
					</div>
					{/* Right column: Project grid (3 columns) */}
					<div className="projects-grid projects-grid-single">
						{loading ? (
							<>
								<ProjectCardSkeleton />
								<ProjectCardSkeleton />
								<ProjectCardSkeleton />
							</>
						) : (
							projects.map((proj, idx) => (
								<a
									key={idx}
									href={proj.link}
									className="project-card"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={proj.image}
										alt={proj.title}
										className="project-image loaded"
										onLoad={(e) => e.currentTarget.classList.add('loaded')}
									/>
									{proj.status && (
										<div className="project-status-pill">
											{proj.status}
										</div>
									)}
									<div className="project-overlay">
										<h3 className="project-title">
											{proj.title}
										</h3>
										<p className="project-description">
											{proj.description}
										</p>
									</div>
								</a>
							))
						)}
					</div>
				</div>
			</section>
			{/* Desktop Web Apps Section */}
			<section className="projects-section">
				<div className="projects-container">
					<div className="projects-info-column">
						<h1 className="projects-title">
							Desktop Web Apps
						</h1>
						<p className="projects-description">
							Interactive desktop-style web applications and productivity tools.
						</p>
					</div>
					<div className="projects-grid projects-grid-single">
						{loading ? (
							<>
								<ProjectCardSkeleton />
								<ProjectCardSkeleton />
								<ProjectCardSkeleton />
								<ProjectCardSkeleton />
								<ProjectCardSkeleton />
								<ProjectCardSkeleton />
							</>
						) : (
							desktopWebApps.map((proj, idx) => (
								<a
									key={idx}
									href={proj.link}
									className="project-card"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={proj.image}
										alt={proj.title}
										className="project-image loaded"
										onLoad={(e) => e.currentTarget.classList.add('loaded')}
									/>
									{proj.status && (
										<div className="project-status-pill">
											{proj.status}
										</div>
									)}
									<div className="project-overlay">
										<h3 className="project-title">
											{proj.title}
										</h3>
										<p className="project-description">
											{proj.description}
										</p>
									</div>
								</a>
							))
						)}
					</div>
				</div>
			</section>
			{/* App Development Section */}
			<section className="projects-section">
				<div className="projects-container">
					<div className="projects-info-column">
						<h1 className="projects-title">
							Applications
						</h1>
						<p className="projects-description">
							Mobile applications showcasing innovative solutions.
						</p>
					</div>
					<div className="projects-grid projects-grid-single">
						{loading ? (
							<>
								<ProjectCardSkeleton />
								<ProjectCardSkeleton />
								<ProjectCardSkeleton />
							</>
						) : (
							appDevelopment.map((proj, idx) => (
								<a
									key={idx}
									href={proj.link}
									className="project-card"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={proj.image}
										alt={proj.title}
										className="project-image loaded"
										onLoad={(e) => e.currentTarget.classList.add('loaded')}
									/>
									{proj.status && (
										<div className="project-status-pill">
											{proj.status}
										</div>
									)}
									<div className="project-overlay">
										<h3 className="project-title">
											{proj.title}
										</h3>
										<p className="project-description">
											{proj.description}
										</p>
									</div>
								</a>
							))
						)}
					</div>
				</div>
			</section>
			{/* Practical Section */}
			<section className="projects-section">
				<div className="projects-container">
					<div className="projects-info-column">
						<h1 className="projects-title">
							Practical
						</h1>
						<p className="projects-description">
							Hands-on projects and practical implementations.
						</p>
					</div>
					<div className="projects-grid projects-grid-single">
						{loading ? (
							<ProjectCardSkeleton />
						) : (
							practical.map((proj, idx) => (
								<a
									key={idx}
									href={proj.link}
									className="project-card"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={proj.image}
										alt={proj.title}
										className="project-image loaded"
										onLoad={(e) => e.currentTarget.classList.add('loaded')}
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
							))
						)}
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};
export default ProjectPage;
