import StackContainer from "../StackContainer";

export default function ButtonContainer(props) {
  const { className = "", ...rest } = props;

  return (
    <StackContainer
      className={`button-container ${className}`}
      direction={{ mobile: "column", desktop: "row" }}
      {...rest}
    >
      {props.children}
    </StackContainer>
  );
}
