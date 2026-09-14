import { Button, Grid } from "@mui/material";
import styles from "./TileButton.module.css";

export default function TileButton(props) {
  const {
    className = "",
    text = props.children,
    fullWidth = true,
    ...otherProps
  } = props;

  return (
    <Button
      classes={styles}
      className={`tile-button ${className}`}
      fullWidth={fullWidth}
      {...otherProps}
    >
      {text}
    </Button>
  );
}
