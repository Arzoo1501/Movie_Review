// Context <API> </ API>
// useContext hooks;

// Context(warehouse)
// Provider (delivery Girl)
// Consumer /(useContext()).   48a0467d. http://www.omdbapi.com/?t=Harry+Potter
import React, { useContext, useEffect, useState, createContext } from "react";
export const API_URL = `https://www.omdbapi.com/?apikey=48a0467d`;

const AppContext = React.createContext();

// We need to create a provider function name(params) {

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState();
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [query, setQuery] = useState("Harry Potter");

  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search);
        setIsError({ show: false, msg: "" });
      } else {
        setIsLoading(false);
        setIsError({
          show: true,
          msg: data.Error || "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setIsError({
        show: true,
        msg: "Something went wrong. Please check your internet connection and try again.",
      });
    }
  };
  useEffect(() => {
    let timerOut = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 500);
    return () => clearTimeout(timerOut);
  }, [query]);

  return (
    <AppContext.Provider
      value={{
        movie,
        isLoading,
        isError,
        query,
        setQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
