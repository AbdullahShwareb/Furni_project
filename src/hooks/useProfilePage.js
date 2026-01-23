import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProfileApi,
  changeEmailApi,
  changePasswordApi,
} from "../api/profileApi";

export default function useProfilePage() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
  });

  const changeEmailMutation = useMutation({
    mutationFn: changeEmailApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePasswordApi,
  });

  return {
    profileQuery,
    changeEmailMutation,
    changePasswordMutation,
  };
}
