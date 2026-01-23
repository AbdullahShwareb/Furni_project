import useProfilePage from "../../hooks/useProfilePage";
import ProfileView from "./ProfileView";

export default function Profile() {
  const p = useProfilePage();

  return (
    <ProfileView
      loading={p.loading}
      msg={p.msg}
      err={p.err}
      basic={p.basic}
      setBasic={p.setBasic}
      email={p.email}
      setEmail={p.setEmail}
      passwords={p.passwords}
      setPasswords={p.setPasswords}
      onSaveBasic={p.saveBasic}
      onSaveEmail={p.saveEmail}
      onSavePassword={p.savePassword}
    />
  );
}
