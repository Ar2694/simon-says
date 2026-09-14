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
  return (
    <WidgetView className={`simons-says-view ${styles.root}`}>
      <StackContainer className="simon-says-content" spacing={4}>
        <GridContainer container className="simon-says-header neon-text">
          <Text component="h1" className="header-text" text="Simon Says" />
        </GridContainer>

        <GridContainer className="simon-says-game">
          {/* Game content goes here */}
          <GridItem size={6}>
            <TileButton text="1" className="btn-1" />
          </GridItem>
          <GridItem size={6}>
            <TileButton text="2" className="btn-2" />
          </GridItem>
          <GridItem size={6}>
            <TileButton text="3" className="btn-3" />
          </GridItem>
          <GridItem size={6}>
            <TileButton text="4" className="btn-4" />
          </GridItem>
        </GridContainer>

        <ScoreView />

        <ButtonContainer className="simon-says-buttons">
          <Button className="start-btn" text="Start Game" variant="outlined" />
          <Button className="reset-btn" text="Reset Game" variant="outlined" color="secondary" />
          <Button className="info-btn" text="End Game" variant="outlined" color="info" />
        </ButtonContainer>
      </StackContainer>
    </WidgetView>
  );
}
