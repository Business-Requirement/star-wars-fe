import React, { useState, useCallback, useEffect } from "react";
import "./Modal.scss";
import { createPortal } from "react-dom";

export interface ModalProps {
  rootElm?: string;
  isOpen?: boolean;
  onBackClick?: Function;
}

const Modal: React.FC<ModalProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const root = props.rootElm || "root";
  const { className, isOpen, onBackClick, ...others } = props;

  useEffect(() => {
    if (isOpen) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
  }, [isOpen]);

  const maskOnClick = () => {
    if (onBackClick) {
      onBackClick();
    }
  };

  return !props.isOpen
    ? null
    : createPortal(
        <div className={`modal ${className}`} {...others}>
          <div className="modal-mask" onClick={maskOnClick}></div>
          <div className="modal-content">{props.children}</div>
        </div>,
        document.getElementById(root) as HTMLElement
      );
};

export { Modal };

type ModalWrapperType = Omit<ModalProps, "isOpen">;

const useModal = (): [React.FC<ModalWrapperType>, (open: boolean) => void] => {
  const [isOpen, openModal] = useState(false);

  const setOpen = useCallback(
    (open: boolean) => {
      openModal(open);
    },
    [openModal]
  );

  const ModalWrapper: React.FC<ModalWrapperType> = (props) => (
    <Modal isOpen={isOpen} rootElm={props.rootElm} onBackClick={props.onBackClick}>
      {props.children}
    </Modal>
  );

  return [ModalWrapper, setOpen];
};

export default useModal;
