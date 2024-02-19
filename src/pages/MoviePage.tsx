import Search from "../components/search/Search";
import VideoPlayer from "../components/videoPlayer/VideoPlayer";
import VideoCards from "../components/videoCard/VideoCard";
import { MyContext } from "../App";
import { useContext } from "react";

const MoviePage = () => {
  const { selectedVideo } = useContext(MyContext);

  return (
    <>
      <div>
        <div className="flex item-center justify-center mt-6">
          <Search />
        </div>
        <div className="flex gap-8 px-40 py-10">
          <div className="h-[80vh] flex flex-col gap-4">
            <div>
              <VideoPlayer
                src={selectedVideo?.videoLink}
                width={1200}
                auto={true}
                controls={true}
              />
            </div>

            <div>
              <div>
                <p className="text-white text-sm">{selectedVideo?.title}</p>
                <p className="text-white text-sm">{selectedVideo?.subtitle}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-400 text-xs">{`${selectedVideo?.views} views`}</p>
                <p className="text-gray-400 text-xs">
                  {selectedVideo?.upload_date}
                </p>
              </div>{" "}
            </div>
          </div>

          <VideoCards />
        </div>
      </div>
    </>
  );
};

export default MoviePage;
