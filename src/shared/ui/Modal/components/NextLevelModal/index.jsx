import Modal, { ModalFooter, ModalHeader } from "@/shared/ui/Modal";
import styles from "./NextLevelModal.module.css";
import Text from "@/shared/ui/Text";
import { PrimaryButton } from "@/shared/ui/Button";

export default function NextLevelModal(props) {
  const { controller, ...rest } = props;
  const { nextLevelModal, simonSayGame } = controller.state;
  const { currentLevel } = simonSayGame;

  return (
    <Modal className={`next-level-modal ${styles.root}`} open={nextLevelModal.open} {...rest}>
      <ModalHeader className="next-level-modal-text-container">
        <Text className="next-level-modal-text modal-header-text " text={`Level completed! Ready for level ${currentLevel}?`} />
      </ModalHeader>
      <ModalFooter className="next-level-modal-button-container">
        <PrimaryButton className="next-level-modal-button small-btn" text="Start" size="small" onClick={controller.onClick("closeNextLevelModal")} />
      </ModalFooter>
    </Modal>
  );
}
