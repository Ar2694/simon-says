import { Typography } from "@mui/material";

export default function Text(props) {
    const {text = props.children, className = "", ...rest} = props;

  return (
    <Typography className={`text ${className}`} {...rest}>{text}</Typography>
  )
}