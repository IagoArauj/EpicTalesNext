
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import { playfair } from "../fonts";
import Button from "../Button";

export default function CustomModal({
  isOpen,
  children,
  onRequestClose,
  title,
  onSave,
  ...props
}: {
  isOpen: boolean;
  children: React.ReactNode;
  onRequestClose: () => void;
  title?: string;
  onSave?: () => void;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      preventScroll
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center"
      className="m-auto w-1/2 h-fit-content bg-white rounded-lg overflow-hidden shadow-lg"
    >
      <div className="flex bg-red-900 text-white p-3">
        <h3 className={`flex-1 text-3xl ${playfair.className} m-auto`}>
          {title}
        </h3>
        <button
          onClick={onRequestClose}
          className="rounded-full w-[2.5rem] h-[2.5rem] transition hover:text-gray-900 hover:bg-white hover:shadow-lg"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <div className="p-4">{children}</div>

      {onSave && (
        <div className="flex justify-evenly p-4">
          <Button
            type="button"
            color="gray"
            onClick={onRequestClose}
            className="w-1/3"
          >
            Close
          </Button>

          <Button
            type="button"
            color="primary"
            onClick={onSave}
            className="w-1/3"
          >
            Save Settings
          </Button>
        </div>
      )}
    </Modal>
  );
}
