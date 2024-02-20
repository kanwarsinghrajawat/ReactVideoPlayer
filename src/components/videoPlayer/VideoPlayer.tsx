import { useRef, useState } from "react";

const VideoPlayer = ({ src, width, height, auto, controls }: any) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const togglePlay = () => {
    console.log(isPlaying);
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
