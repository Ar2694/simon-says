import Modal, { ModalBody, ModalFooter, ModalHeader } from "@/shared/ui/Modal";
import styles from "./InfoModal.module.css";
import Text from "@/shared/ui/Text";
import { PrimaryButton, TertiaryButton } from "@/shared/ui/Button";

export default function InfoModal(props) {
  const { controller, ...rest } = props;
  const { infoModal } = controller.state;

  return (
    <Modal className={`info-modal ${styles.root}`} open={infoModal.open} {...rest}>
      <ModalHeader className="info-modal-text-container">
        <Text className="info-modal-text modal-header-text " text={`How to play Simon Says`} />
      </ModalHeader>
      <ModalBody>
        <Text className="info-modal-text modal-body-text" text={`1. Follow the sequence of colors and repeat it correctly to advance to the next level.`} />
        <Text className="info-modal-text modal-body-text" text={`2. If you make a mistake, the game will end and you will have to start over.`} />
        <Text className="info-modal-text modal-body-text" text={`3. The game continues until you either make a mistake or successfully complete all levels.`} />
        <Text className="info-modal-text modal-body-text" text={`4. Have fun and challenge yourself to improve your memory skills!`} />
      </ModalBody>
      <ModalFooter className="info-modal-button-container">
        <TertiaryButton className="info-modal-button small-btn" text="Close" size="small" onClick={controller.onClick("closeInfoModal")} />
      </ModalFooter>
    </Modal>
  );
}
