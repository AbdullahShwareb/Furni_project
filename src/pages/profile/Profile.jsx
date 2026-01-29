import useProfilePage from "../../hooks/useProfilePage";
import ProfileView from "./ProfileView";

export default function Profile() {
  const profileState = useProfilePage();
  return <ProfileView {...profileState} />;
}
