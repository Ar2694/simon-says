import { Typography } from "@mui/material";

export default function Text(props) {
    const {text = props.children, ...rest} = props;

  return (
    <Typography {...rest}>{text}</Typography>
  )
}