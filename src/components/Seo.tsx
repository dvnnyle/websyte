// src/components/useSeo.ts
import { useEffect } from "react";

type SeoArgs = {
  title: string;
  description: string;
  canonical?: string;
};

export function useSeo({ title, description, canonical }: SeoArgs) {
  useEffect(() => {
    document.title = title;

    // description
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;

    // canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
  }, [title, description, canonical]);
}
