import { Grid, Modal } from "@mui/material";
import styles from "./Modal.module.css";
import GridContainer from "@/shared/containers/GridContainer";

export default function ModalUI(props) {
  const { open = false, children,  ...rest } = props;

  return (
    <Modal component={Grid} classes={styles} open={open} {...rest}>
      <GridContainer className="modal-content">{children}</GridContainer>
    </Modal>
  );
}
