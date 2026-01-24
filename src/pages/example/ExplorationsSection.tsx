import SmallProjectCard from "./SmallProjectCard";

const explorations = [
  { title: "Mini Room", image: "https://arkon.digital/ad-miniroom.b294ce70.png" },
  { title: "Lava Lamp", image: "https://arkon.digital/lava-lamp.7bb9ec96.png" },
  { title: "Distorted Torus", image: "https://arkon.digital/distorted-torus.9d7e3dfc.png" },
  { title: "Morphing Topography", image: "https://arkon.digital/morphing-topography.73c2b1b0.png" },
  { title: "Particles Galaxy", image: "https://arkon.digital/particles-galaxy.c8052bb2.png" },
  { title: "Coral Sphere", image: "https://arkon.digital/coral-sphere.772b0151.png" },
  { title: "Perlin Landscape", image: "https://arkon.digital/perlin-landscape.5feeb403.png" },
  { title: "Synthwave Scene", image: "https://arkon.digital/synthwave-scene.d20b8a82.png" },
  { title: "Earth", image: "https://arkon.digital/earth.ed8c2463.png" },
  { title: "Perlin Cube", image: "https://arkon.digital/perlin-cube.ac2c05d7.png" },
  { title: "Particles Wave", image: "https://arkon.digital/particles-wave.98dcc7f0.png" },
  { title: "Worley Particles", image: "https://arkon.digital/worley-particles.19bf7d67.png" },
];

const ExplorationsSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left column - Title and description */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <h2 className="section-title mb-4">ThreeJS Explorations</h2>
            <p className="section-description">
              I love to create interesting and beautiful 3D scenes in my free time.
              Click to view the live demos!
            </p>
          </div>
          
          {/* Right column - Projects grid (3 columns) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {explorations.map((exploration, index) => (
                <div
                  key={exploration.title}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <SmallProjectCard
                    title={exploration.title}
                    image={exploration.image}
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

export default ExplorationsSection;
