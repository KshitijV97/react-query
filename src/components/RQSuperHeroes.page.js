import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperheroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) =>
    console.log("Perform side errect after data fetching", data);

  const onError = (error) =>
    console.log("Perform side errect after encountering error", error);

  const { isLoading, data, isError, error } = useQuery(
    ["super-heroes"],
    fetchSuperheroes,
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );

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
