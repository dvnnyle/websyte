// Preload images for faster page loads
export const preloadImages = (imageSources: string[]): Promise<boolean[]> => {
  return Promise.all(
    imageSources.map(src => {
      return new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      });
    })
  );
};

// Preload a route component
export const preloadRoute = (importFunc: () => Promise<any>) => {
  importFunc();
};
