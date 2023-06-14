import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";

const fetchColors = ({ pageParam }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQueryPage = ({ pageParam = 1 }) => {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) return pages.length + 1;
      else return undefined;
    },
  });

  if (isLoading) return <h2>Loading ...</h2>;

  if (isError) return <h2>{error.message}</h2>;
  console.log("data is", data);

  return (
    <>
      <div>
        {data?.pages.map((group, i) => {
          return (
            <React.Fragment key={i}>
              {group.data.map((color) => (
                <h2 key={color.id}>
                  {color.id}. {color.label}
                </h2>
              ))}
            </React.Fragment>
          );
        })}
      </div>
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage && <div>Fetching....</div>}</div>
    </>
  );
};

export default InfiniteQueryPage;
