import GridContainer, { GridItem } from "@/shared/containers/GridContainer";
import PaperContainer from "@/shared/containers/PaperContainer";
import StackContainer from "@/shared/containers/StackContainer";
import Text from "@/shared/ui/Text";
import styles from "./ScoreView.module.css";
import { Divider } from "@mui/material";

export default function ScoreView(props) {
      const { controller } = props;
  const { simonSayGame } = controller.state;

  return (
    <PaperContainer classes={styles} className={`score-view`}>
      <GridContainer>
        <GridItem>
          <StackContainer sx={{ alignItems: "center" }} spacing={0}>
            <Text className="stat-label" text="Score" />
            <Text className="stat-value" text={simonSayGame.currentScore} />
          </StackContainer>
        </GridItem>
        <Divider orientation="vertical" flexItem />
        <GridItem>
          <StackContainer sx={{ alignItems: "center" }} spacing={0}>
            <Text className="stat-label" text="Level" />
            <Text className="stat-value" text={simonSayGame.currentLevel} />
          </StackContainer>
        </GridItem>
        <Divider orientation="vertical" flexItem />
        <GridItem>
          <StackContainer sx={{ alignItems: "center" }} spacing={0}>
            <Text className="stat-label" text="Streak" />
            <Text className="stat-value" text={simonSayGame.currentStreak} />
          </StackContainer>
        </GridItem>
      </GridContainer>
    </PaperContainer>
  );
}
