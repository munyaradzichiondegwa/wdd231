// Implement responsive image loading
function ResponsiveImage({ src, alt }) {
  return (
    <img 
      src={src} 
      alt={alt}
      loading="lazy"
      width="300"
      height="200"
    />
  );
}

// Implement error handling for image loading
function ImageWithFallback({ src, fallbackSrc, alt }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleImageError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img 
      src={imgSrc}
      alt={alt}
      onError={handleImageError}
    />
  );
}