import React, { useEffect, useState } from "react";
import useProfilePage from "../../hooks/useProfilePage";

export default function ProfileView() {
  const { profileQuery, changeEmailMutation, changePasswordMutation } =
    useProfilePage();

  const { data: profile, isLoading, isError, error } = profileQuery;

  const [newEmail, setNewEmail] = useState("");
  const [pwdForm, setPwdForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [msg, setMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (profile) {
      setNewEmail(profile.email || "");

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

  if (isLoading) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Loading profile...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: 24 }}>
        <h2 style={{ color: "red" }}>Error</h2>
        <p>{error?.message || "Failed to load profile"}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ padding: 24 }}>
        <h2>No profile data</h2>
      </div>
    );
  }

  const fullName =
    profile.fullName ||
    profile.userName ||
    profile.name ||
    profile.email ||
    "User";

  const email = profile.email || "";
  const phone = profile.phoneNumber || profile.phone || "";

  // تغيير الإيميل
  async function handleEmailSubmit(e) {
    e.preventDefault();
    setMsg("");
    setErrMsg("");

    try {
      await changeEmailMutation.mutateAsync({ newEmail });
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

  return (
    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        padding: "40px 0",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <h1 style={{ marginBottom: 8 }}>My Profile</h1>
        <p style={{ marginTop: 0, marginBottom: 24, color: "#555" }}>
          هنا يمكنك مشاهدة بيانات حسابك وتعديل البريد الإلكتروني وكلمة المرور.
        </p>

        {(msg || errMsg) && (
          <div
            style={{
              marginBottom: 20,
              padding: "10px 14px",
              borderRadius: 10,
              background: errMsg ? "#ffecec" : "#e8f7ef",
              color: errMsg ? "#b32020" : "#0f6b3c",
              fontSize: 14,
            }}
          >
            {errMsg || msg}
          </div>
        )}

        {/* AC INFO*/}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 20,
            border: "1px solid #e3e3e3",
            marginBottom: 24,
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 20 }}>
            Account Info
          </h2>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontSize: 14, color: "#555" }}>
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              readOnly
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #ddd",
                background: "#f9fafb",
              }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontSize: 14, color: "#555" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              readOnly
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #ddd",
                background: "#f9fafb",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 14, color: "#555" }}>
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              readOnly
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #ddd",
                background: "#f9fafb",
              }}
            />
          </div>
        </div>

        {/* CHANGE EMAIL */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 20,
            border: "1px solid #e3e3e3",
            marginBottom: 24,
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 20 }}>
            Change Email
          </h2>

          <form onSubmit={handleEmailSubmit}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 14, color: "#555" }}>
                New Email
              </label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={changeEmailMutation.isPending}
              style={{
                marginTop: 6,
                padding: "9px 18px",
                borderRadius: 999,
                border: "none",
                background: "#111827",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                opacity: changeEmailMutation.isPending ? 0.8 : 1,
              }}
            >
              {changeEmailMutation.isPending ? "Saving..." : "Update Email"}
            </button>
          </form>
        </div>

        {/* CHANGE PASSWORD */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 20,
            border: "1px solid #e3e3e3",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 20 }}>
            Change Password
          </h2>

          <form onSubmit={handlePasswordSubmit}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 14, color: "#555" }}>
                Current Password
              </label>
              <input
                type="password"
                required
                value={pwdForm.currentPassword}
                onChange={(e) =>
                  setPwdForm((f) => ({ ...f, currentPassword: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 14, color: "#555" }}>
                New Password
              </label>
              <input
                type="password"
                required
                value={pwdForm.newPassword}
                onChange={(e) =>
                  setPwdForm((f) => ({ ...f, newPassword: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 14, color: "#555" }}>
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={pwdForm.confirmNewPassword}
                onChange={(e) =>
                  setPwdForm((f) => ({
                    ...f,
                    confirmNewPassword: e.target.value,
                  }))
                }
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={changePasswordMutation.isPending}
              style={{
                marginTop: 6,
                padding: "9px 18px",
                borderRadius: 999,
                border: "none",
                background: "#111827",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                opacity: changePasswordMutation.isPending ? 0.8 : 1,
              }}
            >
              {changePasswordMutation.isPending ? "Saving..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
