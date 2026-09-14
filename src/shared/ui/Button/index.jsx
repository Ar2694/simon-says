import { Button as MuiButton } from "@mui/material";
import styles from "./Button.module.css";

export default function Button(props) {
  const {
    text = props.children,
    className = "",
    variant = "outlined",
    fullWidth = true,
    ...rest
  } = props;

  return (
    <MuiButton
      classes={styles}
      className={`button ${className}`}
      variant={variant}
      fullWidth={fullWidth}
      {...rest}
    >
      {text}
    </MuiButton>
  );
}
