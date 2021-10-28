import { GraphQLClient } from "graphql-request";
import { useEffect } from "react";
import { useQuery } from "react-query";
import Cookie from "universal-cookie";
import { GET_TASKS } from "../queries/queries";
import { Task } from "../types/types";

const cookie = new Cookie();
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT;
let graphQLClient: GraphQLClient;

type TasksRes = {
  tasks: Task[];
};

const fetchTasks = async () => {
  const { tasks: data } = await graphQLClient.request<TasksRes>(GET_TASKS);
  return data;
};
export const useQueryTasks = () => {
  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    });
  }, [cookie.get("token")]);
  return useQuery<Task[], Error>({
    queryKey: "tasks",
    queryFn: fetchTasks,
    staleTime: 0,
  });
};
