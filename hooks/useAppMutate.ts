import { GraphQLClient } from "graphql-request";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import Cookie from "universal-cookie";
import {
  CREATE_NEWS,
  CREATE_TASK,
  DELETE_NEWS,
  DELETE_TASK,
  UPDATE_NEWS,
  UPDATE_TASK,
} from "../queries/queries";
import { resetEditedNews, resetEditTask } from "../slices/uiSlice";
import { EditNews, EditTask, News, Task } from "../types/types";

const cookie = new Cookie();
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT;
let graphQLClient: GraphQLClient;

export const useAppMutate = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    });
  }, [cookie.get("token")]);
  const createTaskMutation = useMutation(
    (title: string) => graphQLClient.request(CREATE_TASK, { title: title }),
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>("tasks");
        if (previousTodos) {
          queryClient.setQueryData("tasks", [
            ...previousTodos,
            res.insert_tasks_one,
          ]);
        }
        dispatch(resetEditTask());
      },
      onError: () => {
        dispatch(resetEditTask());
      },
    }
  );
  const updateTaskMutation = useMutation(
    (task: EditTask) => graphQLClient.request(UPDATE_TASK, task),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>("tasks");
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            "tasks",
            previousTodos.map((task) =>
              task.id === variables.id ? res.update_tasks_by_pk : task
            )
          );
        }
        dispatch(resetEditTask());
      },
      onError: () => {
        dispatch(resetEditTask());
      },
    }
  );
  const deleteTaskMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_TASK, { id: id }),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>("tasks");
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            "tasks",
            previousTodos.filter((task) => task.id !== variables)
          );
        }
        dispatch(resetEditTask());
      },
    }
  );
  const createNewsMutation = useMutation(
    (content: string) =>
      graphQLClient.request(CREATE_NEWS, { content: content }),
    {
      onSuccess: (res) => {
        const previousNews = queryClient.getQueryData<News[]>("news");
        if (previousNews) {
          queryClient.setQueryData("news", [
            ...previousNews,
            res.insert_news_one,
          ]);
        }
        dispatch(resetEditedNews());
      },
      onError: () => {
        dispatch(resetEditedNews());
      },
    }
  );
  const updateNewsMutation = useMutation(
    (news: EditNews) => graphQLClient.request(UPDATE_NEWS, news),
    {
      onSuccess: (res, variables) => {
        const previousNews = queryClient.getQueryData<News[]>("news");
        if (previousNews) {
          queryClient.setQueryData<News[]>(
            "news",
            previousNews.map((news) =>
              news.id === variables.id ? res.update_news_by_pk : news
            )
          );
        }
        dispatch(resetEditedNews());
      },
      onError: () => {
        dispatch(resetEditedNews());
      },
    }
  );
  const deleteNewsMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_NEWS, { id: id }),
    {
      onSuccess: (res, variables) => {
        const previousNews = queryClient.getQueryData<News[]>("news");
        if (previousNews) {
          queryClient.setQueryData<News[]>(
            "news",
            previousNews.filter((news) => news.id !== variables)
          );
        }
        dispatch(resetEditedNews());
      },
    }
  );
  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    createNewsMutation,
    updateNewsMutation,
    deleteNewsMutation,
  };
};
