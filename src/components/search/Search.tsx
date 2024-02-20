import { useState, useContext } from "react";
import { MyContext } from "../../App";

const Search = () => {
  const [search, setSearch] = useState("");
  const { setSearchValue } = useContext(MyContext);

  const setDataInSearch = (event: any) => {
    setSearch(event?.target.value);
  };
  const setDataInStore = (event: any) => {
    if (event.key == "Enter") {
      setSearchValue(search);
    }
  };

  return (
    <>
      <div className="w-1/3 rounded-3xl bg-black py-[2px] px-6 flex gap-2 items-center justify-between h-12 max-sm:w-4/5 ">
        <input
          type="text"
          placeholder="search"
          value={search}
          className="bg-transparent focus:outline-none text-white w-3/4"
          onChange={setDataInSearch}
          onKeyPress={setDataInStore}
        />
        {search === "" ? (
          <img src="/search.png" width="20rem" height="20rem" />
        ) : (
          <img
            src="/close-white.png"
            width="20rem"
            height="20rem"
            onClick={() => {
              setSearch("");
              setSearchValue("");
            }}
          />
        )}
      </div>
    </>
  );
};

export default Search;
