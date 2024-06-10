import { AppContext } from "./Context";
import { useGlobalContext } from "./Context";
import React from "react";
import Search from "./Search";
import Movie from "./Movie";

const HomePage = () => {
  // const name = useContext(AppContext);
  // const name = useGlobalContext();
  return (
    <>
      <div className="container">
        <Search />
        <Movie />
      </div>
    </>
  );
};

export default HomePage;
