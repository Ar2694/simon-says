import { Stack } from "@mui/material";

export default function StackContainer(props) {
  const { className = "", spacing = 2, sx = {}, ...otherProps } = props;

  return (
    <Stack
      spacing={spacing}
      className={`stack-container ${className}`}
      sx={{
        ...sx,
      }}
      {...otherProps}
    >
      {props.children}
    </Stack>
  );
}
