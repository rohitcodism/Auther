'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {

  const [userId, setUserId] = useState("")

  const router = useRouter();

  const onLogOut = async () => {
    try {
      const res = await axios.post("/api/users/logout");

      console.log(res.data);
      toast.success("User logged out successfully");

      router.push("/login")

    } catch (error: any) {

      console.log(error.message);
      toast.error(error.message);
    }
  }

  const getUser = async () => {
    try {

      const resUser = await axios.get("/api/users/me");

      return resUser.data;

    } catch (error: any) {
      toast.error(error.message);
      return null;
    }
  }

  useEffect(() => {
    getUser().then((res) => {
      console.log(res.User);
      setUserId(res.User._id);
    }).catch(() => {
      toast.error("Error occurred!!");
    })
  }, []);

  console.log(userId);


  return (
    <div
      className="
        flex
        flex-col
        min-h-screen
        py-2
        justify-center
        items-center
      "
    >
      <h1 className="text-white font-bold text-4xl text-center">Successfully logged you in</h1>
      <div
        className="
          py-4
          text-center
        "
      >
        <h1
          className="
          font-bold
          text-3xl
          text-white
          py-2
        "
        >
          Profile
        </h1>
        <h2
          className="
            font-bold
            text-2xl
            text-white
            py-2
          "
        >
          Username : {userId}
        </h2>
        <Link
          href={``}
        >
          <button

          >
            Get User Details
          </button>
        </Link>
      </div>
      <button
        className="
          bg-red-600
          p-3
          rounded-lg
          text-center
          font-semibold
          text-lg
          mt-6
        "
        onClick={onLogOut}
      >
        Log out
      </button>
    </div>
  );
}
