import { VFC } from "react";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useLogout } from "../hooks/useLogout";
import firebase from "../firebaseConfig";
import { ChevronDoubleLeftIcon, LogoutIcon } from "@heroicons/react/solid";

const Tasks: VFC = () => {
  const router = useRouter();
  const { logout } = useLogout();
  const user = firebase.auth().currentUser;
  return (
    <Layout title="tasks">
      <p className="my-3">{user?.email}</p>
      <LogoutIcon
        className="h-5 w-5 my-3 text-blue-500 cursor-pointer"
        onClick={() => {
          logout();
          router.push("/");
        }}
      />
      <Link href="/" passHref>
        <div className="mt-20 flex items-center cursor-pointer">
          <ChevronDoubleLeftIcon className="h-5 w-5 mx-1 text-blue-500" />
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default Tasks;
