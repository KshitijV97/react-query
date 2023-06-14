import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchTechstackByTeamId = (teamId) => {
  return axios.get(`http://localhost:4000/teams/${teamId}`);
};

export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );

  const teamId = user?.data.teamId;

  useQuery(["teams", teamId], () => fetchTechstackByTeamId(teamId), {
    enabled: !!teamId,
  });

  return <div> DependentQueries </div>;
};
