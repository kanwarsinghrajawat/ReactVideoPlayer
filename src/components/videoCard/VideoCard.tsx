import React, { useContext, useEffect, useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import VideoPlayer from "../videoPlayer/VideoPlayer";
import { MyContext } from "../../App";
import { DragItem, VideoItem } from "../../constants/types";

const VideoCards: React.FC = () => {
  const { setSelectedVideo, data, searchValue } = useContext(MyContext);
  const [videos, setVideos] = useState<VideoItem[]>(data);
  useEffect(() => {
    setVideos(data);
  }, [data]);
  const handleClick = (video: VideoItem) => {
    setSelectedVideo(video);
  };

  const moveVideo = (dragIndex: number, hoverIndex: number) => {
    const draggedVideo = videos[dragIndex];
    const updatedVideos = [...videos];
    updatedVideos.splice(dragIndex, 1);
    updatedVideos.splice(hoverIndex, 0, draggedVideo);
    setVideos(updatedVideos);
  };

  const DraggableVideo: React.FC<{ index: number; video: VideoItem }> = ({
    index,
    video,
  }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "VIDEO",
      item: { type: "VIDEO", index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: "VIDEO",
      hover: (item: DragItem) => {
        if (!drag) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }
        moveVideo(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    return (
      <div
        ref={(node) => drag(drop(node))}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        onClick={() => handleClick(video)}
        className="cursor-pointer"
      >
        <div className="flex gap-4">
          <VideoPlayer src={video.videoLink} width={150} height={100} />
          <div>
            <div>
              <p className="text-white text-sm">{video.title}</p>
              <p className="text-white text-sm">{video.subtitle}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-gray-400 text-xs">{`${video.views} views`}</p>
              <p className="text-gray-400 text-xs">{video.upload_date}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-2 border border-gray-500 bg-black px-4 py-3 h-[80vh] overflow-y-scroll rounded-xl w-full">
        <p className="text-white text-center text-3xl">
          {searchValue === "" ? "Video Lists" : "Searched Data"}
        </p>
        <div className="flex flex-col gap-2 ">
          {videos.map((video, index) => (
            <DraggableVideo key={index} index={index} video={video} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default VideoCards;
