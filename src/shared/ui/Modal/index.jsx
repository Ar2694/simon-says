import { Modal as MuiModal } from "@mui/material";
import styles from "./Modal.module.css";
import StackContainer from "@/shared/containers/StackContainer";
import ButtonContainer from "@/shared/containers/ButtonContainer";

export default function Modal(props) {
  const { open = false, children, className = "", isCustomModal = false, ...rest } = props;

  return (
    <MuiModal className={`modal ${className}`} classes={styles} open={open} component={StackContainer} disableAutoFocus disableEnforceFocus {...rest}>
      {isCustomModal ? <>{children}</> : <ModalContent>{children}</ModalContent>}
    </MuiModal>
  );
}

export function ModalContent(props) {
  const { children, className = "", spacing = 4, ...rest } = props;

  return (
    <StackContainer className={`modal-content ${className}`} spacing={spacing} {...rest}>
      {children}
    </StackContainer>
  );
}

export function ModalHeader(props) {
  const { children, className = "", ...rest } = props;

  return (
    <StackContainer className={`modal-header ${className}`} {...rest}>
      {children}
    </StackContainer>
  );
}

export function ModalBody(props) {
  const { children, className = "", ...rest } = props;

  return (
    <StackContainer className={`modal-body ${className}`} {...rest}>
      {children}
    </StackContainer>
  );
}

export function ModalFooter(props) {
  const { children, className = "", ...rest } = props;

  return (
    <ButtonContainer className={`modal-footer ${className}`} {...rest}>
      {children}
    </ButtonContainer>
  );
}