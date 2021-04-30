import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "@material-ui/core/Modal";
import { selectIsOpenEdit, setIsOpenEdit } from "../../features/dataSlice";
import EditModalContainer from "./EditModalContainer";
import DialogContent from "@material-ui/core/DialogContent";

const EditModal = () => {
  const editData = useSelector(selectIsOpenEdit);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setIsOpenEdit());
  };

  return (
    <div>
      <Modal
        open={editData}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DialogContent>
          <EditModalContainer />
        </DialogContent>
      </Modal>
    </div>
  );
};

export default EditModal;
