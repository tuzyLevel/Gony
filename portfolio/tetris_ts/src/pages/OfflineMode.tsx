import BGContainer from "../components/BGContainer";
import GameBoard from "../components/GameBoard/GameBoard";

const OfflineMode = () => {
  return (
    <BGContainer>
      <div>
        <h1>Here is Offline Page!</h1>
        <GameBoard />
      </div>
    </BGContainer>
  );
};

export default OfflineMode;
