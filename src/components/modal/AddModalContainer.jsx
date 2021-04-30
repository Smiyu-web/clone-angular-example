import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import firebase, { db } from "../../firebase/firebase";

import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { setIsOpen } from "../../features/dataSlice";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[3],
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Button = styled.button`
  font-size: 14px;
  font-weight: 500;
  border: none;
  background-color: white;
  padding: 25px 16px 0 16px;
  cursor: pointer;
`;

const AddModalContainer = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setIsOpen());
  };

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const [title, setTitle] = useState("");
  const [itemState, setItemState] = useState("");
  const [url, setUrl] = useState("");
  const saveData = async (event) => {
    event.preventDefault();

    const data = {
      title,
      itemState,
      url,
      createdDate: firebase.firestore.FieldValue.serverTimestamp(),
      updatedDate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection("datas").add(data);

    setTitle("");
    setItemState("");
    setUrl("");
  };

  return (
    <div style={modalStyle} className={classes.paper} ref={ref}>
      <h1>Add new Issue</h1>
      <TextField
        required
        id="standard-required"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        label="Title"
        color="secondary"
        multiline
        rows={2}
      />
      <TextField
        required
        id="standard-required"
        value={itemState}
        onChange={(e) => setItemState(e.target.value)}
        name="state"
        label="State"
        color="secondary"
      />
      <TextField
        id="standard"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        label="Url"
        name="url"
        type="url"
        color="secondary"
      />

      <div>
        <Button onClick={(e) => saveData(e)}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </div>
    </div>
  );
});

export default AddModalContainer;
