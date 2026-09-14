import { Paper } from "@mui/material";
import styles from "./WidgetView.module.css";

export default function WidgetView(props) {
  const { className = "" } = props;

  return (
    <Paper className={`widget-view ${className}`} classes={styles} variant="outlined">
      {props.children}
    </Paper>
  );
}
