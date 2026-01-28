import { useSeo } from "../components/Seo";

const SITE = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

export default function Home() {
  useSeo({
    title: "Danny",
    description: "An all-rounder who enjoys building, learning, and solving problems.",
    canonical: `${SITE}/`,
  });

  return <main>{/* ... */}</main>;
}
