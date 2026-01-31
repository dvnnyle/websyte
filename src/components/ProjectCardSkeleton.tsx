import ContentLoader from 'react-content-loader';

const ProjectCardSkeleton = () => (
  <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '4px', overflow: 'hidden' }}>
    <ContentLoader
      speed={2}
      width="100%"
      height="100%"
      viewBox="0 0 400 225"
      backgroundColor="#1a1a24"
      foregroundColor="#2a2a34"
      style={{ width: '100%', height: '100%' }}
    >
      <rect x="0" y="0" rx="4" ry="4" width="400" height="225" />
    </ContentLoader>
  </div>
);

export default ProjectCardSkeleton;
