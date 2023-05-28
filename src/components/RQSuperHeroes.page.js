import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error } = useQuery(["super-heroes"], () => {
    return axios.get("http://localhost:4000/superheroes");
  });

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>{error.msg}</h2>;

  return (
    <div>
      <h2>RQ Super heroes page</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </div>
  );
};
