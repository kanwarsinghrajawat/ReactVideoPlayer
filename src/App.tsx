import React, { useEffect, useState } from "react";
import MoviePage from "./pages/MoviePage";
import { movieList } from "../src/constants/index";
import { VideoItem } from "./constants/types";
import "./App.css";

export const MyContext = React.createContext(
  {} as {
    selectedVideo: VideoItem | null;
    setSelectedVideo: React.Dispatch<React.SetStateAction<VideoItem | null>>;
    data: VideoItem[];
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  }
);

const App = () => {
  const [data, setData] = useState<any>(movieList);
  const [searchValue, setSearchValue] = useState<string>("");
  const firstMovie = data[0];

  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(
    firstMovie
  );

  useEffect(() => {
    if (searchValue.trim() !== "") {
      const filteredData = data.filter((movie: VideoItem) =>
        movie.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData(movieList);
    }
  }, [searchValue]);

  const contextValue = {
    selectedVideo,
    setSelectedVideo,
    data,
    setData,
    searchValue,
    setSearchValue,
  };

  return (
    <>
      <div className="p-0 m-0 bg-black bg-opacity-90  w-full  overflow-x-hidden h-[100vh]">
        <MyContext.Provider value={contextValue}>
          <MoviePage />
        </MyContext.Provider>
      </div>
    </>
  );
};

export default App;
