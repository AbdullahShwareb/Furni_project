import ProfileView from "./ProfileView";
import useProfilePage from "../../hooks/useProfilePage";

export default function Profile() {
  const state = useProfilePage();

  return (
    <ProfileView
      loading={state.loading}
      profile={state.profile}
      msg={state.msg}
      error={state.error}
      onSaveBasic={state.saveBasic}
      onSaveEmail={state.saveEmail}
      onSavePassword={state.savePassword}
      onReload={state.reload}
    />
  );
}
