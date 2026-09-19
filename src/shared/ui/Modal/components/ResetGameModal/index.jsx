import Modal, { ModalFooter, ModalHeader } from "@/shared/ui/Modal";
import styles from "./ResetGameModal.module.css";
import Text from "@/shared/ui/Text";
import { SecondaryButton } from "@/shared/ui/Button";

export default function ResetGameModal(props) {
  const { controller, ...rest } = props;
  const { resetGameModal } = controller.state;

  return (
    <Modal className={`reset-game-modal ${styles.root}`} open={resetGameModal.open} {...rest}>
      <ModalHeader className="reset-game-modal-text-container">
        <Text className="reset-game-modal-text modal-header-text " text={`Are you sure you want to reset the game?`} />
      </ModalHeader>
      <ModalFooter className="reset-game-modal-button-container">
        <SecondaryButton className="reset-game-modal-button small-btn" text="Reset Game" size="small" onClick={controller.onClick("resetGame")} />
        <SecondaryButton className="reset-game-modal-button small-btn" text="Cancel" size="small" onClick={controller.onClick("closeResetGameModal")} />
      </ModalFooter>
    </Modal>
  );
}
