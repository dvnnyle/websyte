
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
	}
];

const appDevelopment = [
	{
		title: "Playworld PWA",
		description: "Progressive web application",
		image: "/portfolio/app1/appPreviewPW.png",
		link: "#",
		status: "In Development"
	},
	{
		title: "HomeAbroad",
		description: "Mobile application project",
		image: "/portfolio/app1/NOWAY.png",
		link: "#"
	}
];

const practical = [
	{
		title: "MMD-IT Internship",
		description: "Multimedia project",
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
				<div className="projects-grid projects-grid-single">
					{projects.map((proj, idx) => (
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
								className="project-image"
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
						Applications
					</h1>
					<p className="projects-description">
						Mobile applications showcasing innovative solutions.
					</p>
				</div>

				{/* Right column: Project grid (3 columns) */}
				<div className="projects-grid projects-grid-single">
					{appDevelopment.map((proj, idx) => (
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
								className="project-image"
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
							target="_blank"
							rel="noopener noreferrer"
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
