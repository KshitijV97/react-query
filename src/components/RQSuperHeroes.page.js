import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) =>
    console.log("Perform side errect after data fetching", data);

  const onError = (error) =>
    console.log("Perform side errect after encountering error", error);

  const { isLoading, data, isError, error } = useSuperHeroesData(
    onSuccess,
    onError
  );

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>{error.msg}</h2>;

  return (
    <div>
      <h2>RQ Super heroes page</h2>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id} style={{ cursor: "pointer" }}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data.map((heroName) => (
        <div key={heroName}>{heroName}</div>
      ))} */}
    </div>
  );
};
