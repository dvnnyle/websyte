import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Suspense } from 'react';
import { HeroSphere } from './HeroSphere';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] glow-sphere animate-pulse-glow" />
      </div>

      {/* 3D Sphere */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
          <Suspense fallback={
            <div className="w-full h-full rounded-full hero-sphere animate-float" />
          }>
            <HeroSphere />
          </Suspense>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          className="section-label mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Web3 Investment Firm
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Backing Ambitious
          <br />
          Ideas
        </motion.h1>

        <motion.a
          href="#portfolio"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Start Exploring
          <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-foreground transition-colors">
            <ChevronDown size={14} />
          </span>
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-muted-foreground to-transparent animate-scroll" />
      </motion.div>

      {/* Side navigation indicator */}
      <div className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-3 z-50">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <motion.div
            key={index}
            className={`w-[2px] h-8 rounded-full ${index === 0 ? 'bg-foreground' : 'bg-muted'}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          />
        ))}
      </div>
    </section>
  );
};
