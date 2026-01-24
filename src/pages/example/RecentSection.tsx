import ProjectCard from "./ProjectCard";

const recentProjects = [
  {
    title: "HKFP Support Site",
    image: "https://arkon.digital/hkfpsprt_thumbnail.e47efa36.png",
  },
  {
    title: "HKFP App",
    image: "https://arkon.digital/hkfpapp_thumbnail.159f9cc0.png",
  },
  {
    title: "Varadise Construction Monitoring Panel",
    image: "https://arkon.digital/varadise_thumbnail.60742fbb.png",
  },
  {
    title: "WGO Online Calculator",
    image: "https://arkon.digital/wgo_thumbnail.7c10bee4.png",
  },
];

const RecentSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left column - Title and description */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <h2 className="section-title mb-4">Recent Projects</h2>
            <p className="section-description">
              Over the past 10 years, I have developed projects of various kinds such as Blogs, CMS,
              company website, funding platform and Android+iOS apps.
            </p>
          </div>
          
          {/* Right column - Projects grid (3 columns) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentProjects.map((project, index) => (
                <div
                  key={project.title}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProjectCard
                    title={project.title}
                    image={project.image}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentSection;
