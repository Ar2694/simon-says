import { Grid } from "@mui/material";

export default function GridContainer(props) {
  const {
    className = "",
    spacing = 2,
    container = true,
    sx = {},
    ...otherProps
  } = props;

  return (
    <Grid
      container={container}
      spacing={spacing}
      className={`grid-container ${className}`}
      sx={{
        alignItems:"center",
        ...sx
      }}

      {...otherProps}
    >
      {props.children}
    </Grid>
  );
}


export function GridItem(props) {
  const {
    className = "",
    size = "grow",
    sx = {},
    ...otherProps
  } = props;

  return (
    <Grid
      size={size}
      className={`grid-item ${className}`}
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      {props.children}
    </Grid>
  );
}