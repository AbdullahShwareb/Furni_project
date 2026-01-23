import { useState } from "react";

export default function ProfileView({
  loading,
  msg,
  err,

  basic,
  email,
  passwords,

  onChangeBasic,
  onChangeEmail,
  onChangePasswords,

  onSaveBasic,
  onSaveEmail,
  onSavePasswords,

  onReload,
}) {
  const [tab, setTab] = useState("basic"); // basic | email | password

  return (
    <div style={{ padding: "32px 16px", maxWidth: 800, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 8 }}>Profile</h2>

      <button
        onClick={onReload}
        disabled={loading}
        style={{
          marginBottom: 16,
          padding: "6px 14px",
          borderRadius: 999,
          border: "1px solid #ddd",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        {loading ? "Refreshing..." : "Reload profile"}
      </button>

      {msg && (
        <div
          style={{
            marginBottom: 10,
            padding: 10,
            borderRadius: 10,
            background: "#ecfdf3",
            border: "1px solid #a7f3d0",
            color: "#166534",
          }}
        >
          {msg}
        </div>
      )}
      {err && (
        <div
          style={{
            marginBottom: 10,
            padding: 10,
            borderRadius: 10,
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
          }}
        >
          {err}
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button
          onClick={() => setTab("basic")}
          style={tabBtnStyle(tab === "basic")}
        >
          Basic info
        </button>
        <button
          onClick={() => setTab("email")}
          style={tabBtnStyle(tab === "email")}
        >
          Email
        </button>
        <button
          onClick={() => setTab("password")}
          style={tabBtnStyle(tab === "password")}
        >
          Password
        </button>
      </div>

      {tab === "basic" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSaveBasic();
          }}
          style={cardStyle}
        >
          <h3 style={{ marginTop: 0 }}>Basic information</h3>

          <label style={labelStyle}>
            Full name
            <input
              type="text"
              value={basic.fullName || ""}
              onChange={(e) =>
                onChangeBasic({ ...basic, fullName: e.target.value })
              }
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Phone number
            <input
              type="text"
              value={basic.phoneNumber || ""}
              onChange={(e) =>
                onChangeBasic({ ...basic, phoneNumber: e.target.value })
              }
              style={inputStyle}
            />
          </label>

          <button type="submit" disabled={loading} style={primaryBtnStyle}>
            {loading ? "Saving..." : "Save changes"}
          </button>
        </form>
      )}

      {tab === "email" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSaveEmail();
          }}
          style={cardStyle}
        >
          <h3 style={{ marginTop: 0 }}>Update email</h3>

          <label style={labelStyle}>
            Email
            <input
              type="email"
              value={email.email || ""}
              onChange={(e) =>
                onChangeEmail({ ...email, email: e.target.value })
              }
              style={inputStyle}
            />
          </label>

          <button type="submit" disabled={loading} style={primaryBtnStyle}>
            {loading ? "Saving..." : "Save email"}
          </button>
        </form>
      )}

      {tab === "password" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSavePasswords();
          }}
          style={cardStyle}
        >
          <h3 style={{ marginTop: 0 }}>Change password</h3>

          <label style={labelStyle}>
            Current password
            <input
              type="password"
              value={passwords.currentPassword || ""}
              onChange={(e) =>
                onChangePasswords({
                  ...passwords,
                  currentPassword: e.target.value,
                })
              }
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            New password
            <input
              type="password"
              value={passwords.newPassword || ""}
              onChange={(e) =>
                onChangePasswords({
                  ...passwords,
                  newPassword: e.target.value,
                })
              }
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Confirm password
            <input
              type="password"
              value={passwords.confirmPassword || ""}
              onChange={(e) =>
                onChangePasswords({
                  ...passwords,
                  confirmPassword: e.target.value,
                })
              }
              style={inputStyle}
            />
          </label>

          <button type="submit" disabled={loading} style={primaryBtnStyle}>
            {loading ? "Saving..." : "Change password"}
          </button>
        </form>
      )}
    </div>
  );
}

const tabBtnStyle = (active) => ({
  padding: "6px 14px",
  borderRadius: 999,
  border: active ? "1px solid #111" : "1px solid #ddd",
  background: active ? "#111" : "#fff",
  color: active ? "#fff" : "#111",
  cursor: "pointer",
  fontWeight: 600,
});

const cardStyle = {
  background: "#fff",
  borderRadius: 16,
  border: "1px solid #e5e7eb",
  padding: 20,
};

const labelStyle = {
  display: "block",
  marginBottom: 14,
  fontSize: 14,
  fontWeight: 500,
};

const inputStyle = {
  width: "100%",
  marginTop: 6,
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #d1d5db",
  outline: "none",
};

const primaryBtnStyle = {
  marginTop: 8,
  padding: "10px 20px",
  borderRadius: 999,
  border: "none",
  background: "#111",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};
