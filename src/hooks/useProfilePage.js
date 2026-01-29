import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProfileApi,
  changeEmailApi,
  changePasswordApi,
} from "../api/profileApi";

export default function useProfilePage() {
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
  });

  const [email, setEmail] = useState("");
  const [pwdForm, setPwdForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [msg, setMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // mutations
  const changeEmailMutation = useMutation({
    mutationFn: changeEmailApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePasswordApi,
  });

  useEffect(() => {
    if (profile) {
      setEmail(profile.email || "");

      try {
        localStorage.setItem("user", JSON.stringify(profile));

        if (profile.fullName) {
          localStorage.setItem("userName", profile.fullName);
        } else if (profile.userName) {
          localStorage.setItem("userName", profile.userName);
        } else if (profile.email) {
          localStorage.setItem("userName", profile.email);
        }
      } catch {
        // ignore
      }
    }
  }, [profile]);

  // تغيير الإيميل
  async function handleEmailSubmit(e) {
    e.preventDefault();
    setMsg("");
    setErrMsg("");

    try {
      await changeEmailMutation.mutateAsync({ newEmail: email });
      setMsg("تم تحديث البريد الإلكتروني بنجاح ");
    } catch (err) {
      console.error(err);
      setErrMsg("فشل تعديل البريد الإلكتروني ");
    }
  }

  // تغيير الباسورد
  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setMsg("");
    setErrMsg("");

    if (pwdForm.newPassword !== pwdForm.confirmNewPassword) {
      setErrMsg("تأكيد كلمة المرور غير مطابق ");
      return;
    }

    try {
      await changePasswordMutation.mutateAsync(pwdForm);
      setMsg("تم تغيير كلمة المرور بنجاح ");
      setPwdForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      console.error(err);
      setErrMsg("فشل تغيير كلمة المرور ");
    }
  }

  const onPwdFieldChange = (field, value) => {
    setPwdForm((f) => ({ ...f, [field]: value }));
  };

  return {
    // data
    profile,
    isLoading,
    isError,
    error,

    // email form
    email,
    setEmail,
    handleEmailSubmit,
    savingEmail: changeEmailMutation.isPending,

    // password form
    pwdForm,
    onPwdFieldChange,
    handlePasswordSubmit,
    savingPassword: changePasswordMutation.isPending,

    // messages
    msg,
    errMsg,
  };
}
