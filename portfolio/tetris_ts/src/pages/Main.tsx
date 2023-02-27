import { useNavigate } from "react-router-dom";
import BGContainer from "../components/BGContainer";
import EnterBox from "../components/EnterBox";
import CustomButton from "../UI/CustomButton";

const Main = () => {
  const navigate = useNavigate();

  const offlinePushHandler = () => {
    navigate("/OfflineMode", { replace: false });
  };

  const onlinePushHandler = () => {
    navigate("/OnlineMode", { replace: false });
  };

  return (
    <BGContainer>
      <EnterBox>
        <CustomButton
          cssClasses={["enter", "enter-offline"]}
          name="Enter Offline"
          onPush={offlinePushHandler}
        />
        <CustomButton
          cssClasses={["enter", "enter-online"]}
          name="Enter Online"
          onPush={onlinePushHandler}
        />
      </EnterBox>
    </BGContainer>
  );
};

export default Main;
