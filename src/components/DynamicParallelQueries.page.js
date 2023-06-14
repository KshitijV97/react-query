import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelQueries = ({ heroIds }) => {
  const queries = heroIds.map((id) => {
    return {
      queryKey: ["super-hero", id],
      queryFn: () => fetchSuperHero(id),
    };
  });
  const queryResults = useQueries({
    queries: queries,
  });
  console.log(queryResults);
  return <div>DynamicParallelPage</div>;
};
