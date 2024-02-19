import React, { useEffect, useState } from "react";
import "./App.css";
import MoviePage from "./pages/MoviePage";
import { movieList } from "../src/constants/index";
import { VideoItem } from "./constants/types";

// Create a context
export const MyContext = React.createContext(
  {} as {
    selectedVideo: VideoItem | null;
    setSelectedVideo: React.Dispatch<React.SetStateAction<VideoItem | null>>;
    data: VideoItem[];
    searchValue: string; // Corrected to string
    setSearchValue: React.Dispatch<React.SetStateAction<string>>; // Include setSearchValue
  }
);

const App = () => {
  const [data, setData] = useState<any>(movieList);
  const [searchValue, setSearchValue] = useState<any>("");
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
