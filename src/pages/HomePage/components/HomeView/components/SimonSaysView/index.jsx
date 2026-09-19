import Text from "@/shared/ui/Text";
import WidgetView from "@/shared/views/WidgetView";
import GridContainer, { GridItem } from "@/shared/containers/GridContainer";
import StackContainer from "@/shared/containers/StackContainer";
import styles from "./SimonSaysView.module.css";
import Button from "@/shared/ui/Button";
import TileButton from "@/shared/ui/TileButton";
import ButtonContainer from "@/shared/containers/ButtonContainer";
import ScoreView from "@/shared/views/ScoreView";

import GameOverModal from "@/shared/ui/Modal/components/GameOverModal";
import NextLevelModal from "@/shared/ui/Modal/components/NextLevelModal";
import InfoModal from "@/shared/ui/Modal/components/InfoModal";
import ResetGameModal from "@/shared/ui/Modal/components/ResetGameModal";

export default function SimonSaysView(props) {
  const { controller } = props;
  const { simonSayGame } = controller.state;

  return (
    <WidgetView className={`simons-says-view ${styles.root}`}>
      <StackContainer className="simon-says-content" spacing={4}>
        <GridContainer container className="simon-says-header neon-text">
          <Text component="h1" className="header-text" text="Simon Says" />
        </GridContainer>

        <GridContainer className="simon-says-game">
          {/* Game content goes here */}
          <GridItem size={6}>
            <TileButton
              text="1"
              disabled={!simonSayGame.isPlayerTurn}
              className={`btn-1 ${simonSayGame.isPlayerTurn ? "player-active" : ""} ${simonSayGame.btn1.active ? "active" : ""}`}
              onClick={controller.onClick("validatePlayerMove", 1)}
            />
          </GridItem>
          <GridItem size={6}>
            <TileButton
              text="2"
              disabled={!simonSayGame.isPlayerTurn}
              className={`btn-2 ${simonSayGame.isPlayerTurn ? "player-active" : ""} ${simonSayGame.btn2.active ? "active" : ""}`}
              onClick={controller.onClick("validatePlayerMove", 2)}
            />
          </GridItem>
          <GridItem size={6}>
            <TileButton
              text="3"
              disabled={!simonSayGame.isPlayerTurn}
              className={`btn-3 ${simonSayGame.isPlayerTurn ? "player-active" : ""} ${simonSayGame.btn3.active ? "active" : ""}`}
              onClick={controller.onClick("validatePlayerMove", 3)}
            />
          </GridItem>
          <GridItem size={6}>
            <TileButton
              text="4"
              disabled={!simonSayGame.isPlayerTurn}
              className={`btn-4 ${simonSayGame.isPlayerTurn ? "player-active" : ""} ${simonSayGame.btn4.active ? "active" : ""}`}
              onClick={controller.onClick("validatePlayerMove", 4)}
            />
          </GridItem>
        </GridContainer>

        <ScoreView controller={controller} />

        <ButtonContainer className="simon-says-buttons">
          <Button
            className="start-btn"
            text="Start Game"
            variant="outlined"
            onClick={controller.onClick("startGame")}
            disabled={simonSayGame.hasStarted}
          />
          <Button
            className="reset-btn"
            text="Reset Game"
            variant="outlined"
            color="secondary"
            disabled={!simonSayGame.hasStarted}
            onClick={controller.onClick("openResetGameModal")}
          />
          <Button className="info-btn" text="Info" variant="outlined" color="info" onClick={controller.onClick("openInfoModal")} />
          <NextLevelModal controller={controller} />
          <GameOverModal controller={controller} />
          <InfoModal controller={controller} />
          <ResetGameModal controller={controller} />
        </ButtonContainer>
      </StackContainer>
    </WidgetView>
  );
}
