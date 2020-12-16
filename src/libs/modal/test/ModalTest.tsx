import React from "react";
import useModal from "../Modal";

const ModalTest: React.FC = () => {

  const [Modal, setModal1] = useModal();
  const [Modal2, setModal2] = useModal();

  const open1 = () => {
    setModal1(true);
  }

  return ( 
    <>
      <button onClick={open1}>Open Modal 1 (close-able when click back mask)</button> <br></br>
      <button onClick={() => setModal2(true)}>Open Modal 2 (can not close by back mask)</button>
      <Modal onBackClick={() => setModal1(false) }>
        <p>Modal content 1</p>
      </Modal>

      <Modal2>
        <p>Modal content 2</p>
        <button onClick={() => setModal2(false)}>Close my model</button>
      </Modal2>
    </>
  );
}

export default ModalTest;