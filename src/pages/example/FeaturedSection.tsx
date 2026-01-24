import ProjectCard from "./ProjectCard";

const featuredProjects = [
  {
    title: "Nkosi Photography Portfolio",
    image: "https://arkon.digital/nkosi_thumbnail.c6379551.png",
  },
  {
    title: "Ryngs Diamond Eshop",
    image: "https://arkon.digital/ryngs_thumbnail.fa0c6e1b.png",
  },
  {
    title: "Virtual Museum Tour",
    image: "https://arkon.digital/moma_thumbnail.831a2325.png",
  },
  {
    title: "Online Clothing Eshop",
    image: "https://arkon.digital/dawn_thumbnail.2cfd88b5.png",
  },
  {
    title: "Digital Agency Website",
    image: "https://arkon.digital/fidr_thumbnail.28af9394.png",
  },
  {
    title: "Photography Portfolio Landing",
    image: "https://arkon.digital/marco_thumbnail.53dff29d.png",
  },
  {
    title: "Stackz Landing Concept",
    image: "https://arkon.digital/stackz_thumbnail.cad6236c.png",
  },
  {
    title: "Bold Landing Concept",
    image: "https://arkon.digital/bold_thumbnail.88d3f9cd.png",
  },
];

const FeaturedSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left column - Title and description */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <h2 className="section-title mb-4">Featured Portfolio</h2>
            <p className="section-description">
              I designed and developed these showcase projects with Figma, Spline, React and ThreeJs in 2024.
              Various 3D elements/scenes are tailor-made to create more absorbing user experiences.
              Click to view each project in detail.
            </p>
          </div>
          
          {/* Right column - Projects grid (3 columns) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredProjects.map((project, index) => (
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

export default FeaturedSection;
