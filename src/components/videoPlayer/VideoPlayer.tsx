import { useRef, useState } from "react";
import { movieList } from "../../constants/index";

const VideoPlayer = ({ src, width, height, auto, controls }: any) => {
  const firstMovie = movieList[0];

  if (!firstMovie) {
    return null;
  }

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        setIsPlaying(true);
      } else {
        videoElement.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        onClick={togglePlay}
        width={width}
        height={height}
        {...(auto ? { autoPlay: true, muted: true } : {})}
        {...(controls ? { controls: true } : {})}
      />
    </>
  );
};

export default VideoPlayer;
