import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import Cookie from "universal-cookie";
import firebase from "../firebaseConfig";
import { resetEditedNews, resetEditTask } from "../slices/uiSlice";
import { unSubMeta } from "./useUserChanged";

const cookie = new Cookie();
export const useLogout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const logout = async () => {
    if (unSubMeta) {
      unSubMeta();
    }
    dispatch(resetEditTask());
    dispatch(resetEditedNews());
    await firebase.auth().signOut();
    queryClient.removeQueries("tasks");
    queryClient.removeQueries("news");
    cookie.remove("token");
  };
  return { logout };
};
