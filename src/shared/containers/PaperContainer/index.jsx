import { Paper } from "@mui/material";

export default function PaperContainer(props) {
  const { className = "", variant = "outlined", ...rest } = props;

  return (
    <Paper
      className={`paper-container ${className}`}
      variant={variant}
      {...rest}
    >
      {props.children}
    </Paper>
  );
}
