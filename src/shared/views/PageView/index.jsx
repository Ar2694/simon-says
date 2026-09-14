import StarView from "@/shared/views/StarView";
import { Container, Grid, Stack } from "@mui/material";
import styles from "./PageView.module.css";

export default function PageView(props) {
  return (
    <Container classes={styles} className={`page-view`} maxWidth="desktop">
      <Stack className="page-view-content" spacing={2} direction="column">
        <StarView />
        {props.children}
      </Stack>
    </Container>
  );
}
