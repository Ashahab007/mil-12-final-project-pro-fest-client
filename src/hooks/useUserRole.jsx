import React from "react";
import UseAuth from "./UseAuth/UseAuth";
import useAxiosSecure from "./UseAuth/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// 31.2 create a custom hook
const useUserRole = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = null,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data.role;
    },
  });

  return { role, isLoading, isError };
};

export default useUserRole;
