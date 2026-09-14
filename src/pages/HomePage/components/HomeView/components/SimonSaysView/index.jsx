import Text from "@/shared/ui/Text";
import WidgetView from "@/shared/views/WidgetView";
import GridContainer, { GridItem } from "@/shared/containers/GridContainer";
import StackContainer from "@/shared/containers/StackContainer";
import styles from "./SimonSaysView.module.css";
import Button from "@/shared/ui/Button";
import TileButton from "@/shared/ui/TileButton";
import ButtonContainer from "@/shared/containers/ButtonContainer";
import ScoreView from "@/shared/views/ScoreView";

export default function SimonSaysView(props) {
  const { controller, btnRefOne, btnRefTwo, btnRefThree, btnRefFour } = props;
  const { simonSayGame } = controller.state;

  console.log("btnRefOne", props);
  return (
    <WidgetView className={`simons-says-view ${styles.root}`}>
      <StackContainer className="simon-says-content" spacing={4}>
        <GridContainer container className="simon-says-header neon-text">
          <Text component="h1" className="header-text" text="Simon Says" />
        </GridContainer>

        <GridContainer className="simon-says-game">
          {/* Game content goes here */}
          <GridItem size={6}>
            <TileButton text="1" className="btn-1" onClick={controller.onClick("targetBtn", "1")} ref={btnRefOne} />
          </GridItem>
          <GridItem size={6}>
            <TileButton text="2" className="btn-2" onClick={controller.onClick("targetBtn", "2")} ref={btnRefTwo} />
          </GridItem>
          <GridItem size={6}>
            <TileButton text="3" className="btn-3" onClick={controller.onClick("targetBtn", "3")} ref={btnRefThree} />
          </GridItem>
          <GridItem size={6}>
            <TileButton text="4" className="btn-4" onClick={controller.onClick("targetBtn", "4")} ref={btnRefFour} />
          </GridItem>
        </GridContainer>

        <ScoreView controller={controller} />

        <ButtonContainer className="simon-says-buttons">
          <Button className="start-btn" text="Start Game" variant="outlined" onClick={controller.onClick("startGame")} disabled={simonSayGame.hasStarted} />
          <Button className="reset-btn" text="Reset Game" variant="outlined" color="secondary" onClick={controller.onClick("resetGame")}  />
          <Button className="info-btn" text="Info" variant="outlined" color="info" onClick={controller.onClick("showInfoModal")} />
        </ButtonContainer>
      </StackContainer>
    </WidgetView>
  );
}
