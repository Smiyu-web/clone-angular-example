import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "@material-ui/core/Modal";
import { selectIsOpenModal, setIsOpen } from "../../features/dataSlice";
import AddModalContainer from "./AddModalContainer";
import DialogContent from "@material-ui/core/DialogContent";

const AddModal = React.forwardRef((props, ref) => {
  const addData = useSelector(selectIsOpenModal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setIsOpen());
  };

  return (
    <Modal
      ref={ref}
      open={addData}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <DialogContent>
        <AddModalContainer />
      </DialogContent>
    </Modal>
  );
});

export default AddModal;
