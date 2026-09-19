import Modal, { ModalFooter, ModalHeader } from "@/shared/ui/Modal";
import styles from "./GameOverModal.module.css";
import Text from "@/shared/ui/Text";
import { SecondaryButton } from "@/shared/ui/Button";

export default function GameOverModal(props) {
  const { controller, ...rest } = props;
  const { gameOverModal } = controller.state;

  return (
    <Modal className={`game-over-modal ${styles.root}`} open={gameOverModal.open} {...rest}>
      <ModalHeader className="game-over-modal-header">
        <Text className="game-over-modal-text modal-header-text " text="Game Over! Try again." />
      </ModalHeader>
      <ModalFooter className="game-over-modal-button-container">
        <SecondaryButton className="game-over-modal-button small-btn" text="Close" size="small" onClick={controller.onClick("closeGameOverModal")} />
      </ModalFooter>
    </Modal>
  );
}
