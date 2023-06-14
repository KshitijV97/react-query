import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperheroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(["super-heroes"], fetchSuperheroes, {
    onSuccess,
    onError,
    // select: (data) => data.data.map((h) => h.name), commenting as we require heroId for QueryById
  });
};
