import React from "react";
import ENDPOINTS from "../config/endpoints";
import { api } from "../config/axios";
import { useQuery } from "@tanstack/react-query";

const ProfileComponent = () => {
  const { data, isError } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get(ENDPOINTS.user.me());
      console.log(res);
      return res.data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60,
  });
  return (
    <div className="w-full h-full items-center flex flex-col justify-center">
      <div></div>
    </div>
  );
};

export default ProfileComponent;
