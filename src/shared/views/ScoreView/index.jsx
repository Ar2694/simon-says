import GridContainer, { GridItem } from "@/shared/containers/GridContainer";
import PaperContainer from "@/shared/containers/PaperContainer";
import StackContainer from "@/shared/containers/StackContainer";
import Text from "@/shared/ui/Text";
import styles from "./ScoreView.module.css";
import { Divider } from "@mui/material";

export default function ScoreView(props) {
  return (
    <PaperContainer classes={styles} className={`score-view`}>
      <GridContainer>
        <GridItem>
          <StackContainer sx={{ alignItems: "center" }} spacing={0}>
            <Text className="stat-label" text="Score" />
            <Text className="stat-value" text={"0"} />
          </StackContainer>
        </GridItem>
        <Divider orientation="vertical" flexItem />
        <GridItem>
          <StackContainer sx={{ alignItems: "center" }} spacing={0}>
            <Text className="stat-label" text="Level" />
            <Text className="stat-value" text={"1"} />
          </StackContainer>
        </GridItem>
        <Divider orientation="vertical" flexItem />
        <GridItem>
          <StackContainer sx={{ alignItems: "center" }} spacing={0}>
            <Text className="stat-label" text="Streak" />
            <Text className="stat-value" text={"0"} />
          </StackContainer>
        </GridItem>
      </GridContainer>
    </PaperContainer>
  );
}
