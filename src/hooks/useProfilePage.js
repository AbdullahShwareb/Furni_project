import { useEffect, useState } from "react";
import {
  getProfileApi,
  updateProfileApi,
  updateEmailApi,
  changePasswordApi,
} from "../api/profileApi";

export default function useProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setMsg("");
    setError("");
    try {
      const data = await getProfileApi();
      setProfile(data);
    } catch (e) {
      console.error(e);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function saveBasic(values) {
    try {
      setError("");
      setMsg("");
      const updated = await updateProfileApi(values);
      setProfile(updated);
      setMsg("تم تحديث البيانات بنجاح ✅");
    } catch (e) {
      console.error(e);
      setError("فشل تحديث البيانات");
    }
  }

  async function saveEmail(values) {
    try {
      setError("");
      setMsg("");
      await updateEmailApi(values);
      setMsg("تم تحديث الإيميل ✅");
    } catch (e) {
      console.error(e);
      setError("فشل تحديث الإيميل");
    }
  }

  async function savePassword(values) {
    try {
      setError("");
      setMsg("");
      await changePasswordApi(values);
      setMsg("تم تغيير كلمة المرور ");
    } catch (e) {
      console.error(e);
      setError("فشل تغيير كلمة المرور");
    }
  }

  return {
    profile,
    loading,
    msg,
    error,
    reload: load,
    saveBasic,
    saveEmail,
    savePassword,
  };
}
