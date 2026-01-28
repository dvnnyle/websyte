
import "./project.css";
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useSeo } from '../components/Seo';

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
  useSeo({
    title: "Projects | Danny Nguyen Le",
    description: "A closer look at a project — how it was built, what was learned, and the ideas behind the work.",
    canonical: `${SITE}/project`,
  });
  return (
    <>
      <Navbar />
      {/* ...existing code... */}
      <Footer />
    </>
  );
};
};

export default ProjectPage;
