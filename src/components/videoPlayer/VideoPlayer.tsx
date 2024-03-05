const VideoPlayer = ({ src, width, height, auto, controls }: any) => {
  return (
    <>
      <video
        src={src}
        width={width}
        height={height}
        {...(auto ? { autoPlay: true, muted: true } : {})}
        {...(controls ? { controls: true } : {})}
      />
    </>
  );
};

export default VideoPlayer;
