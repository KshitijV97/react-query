import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <h2>Loading ...</h2>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              {color.id}. {color.label}
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next
        </button>
      </div>
      {isFetching && <span>Loading.....</span>}
    </>
  );
};

export default PaginatedQueriesPage;
