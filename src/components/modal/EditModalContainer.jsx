import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import firebase, { db } from "../../firebase/firebase";

import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { setIsOpenEdit, selectEditId } from "../../features/dataSlice";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[3],
    padding: theme.spacing(6, 4, 3),
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

const EditModalContainer = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const editId = useSelector(selectEditId);
  const [modalStyle] = useState(getModalStyle);

  const [title, setTitle] = useState("");
  const [itemState, setItemState] = useState("");
  const [url, setUrl] = useState("");

  const handleClose = () => {
    dispatch(setIsOpenEdit());
  };

  const docRef = db.collection("datas").doc(editId);
  useEffect(() => {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setTitle(doc.data().title);
          setItemState(doc.data().itemState);
          setUrl(doc.data().url);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const editData = async (event) => {
    event.preventDefault();

    const data = {
      title,
      itemState,
      url,
      updatedDate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await docRef.update(data);
  };

  return (
    <div style={modalStyle} className={classes.paper} ref={ref}>
      <h1>Issue id: {editId}</h1>
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
        <Button onClick={(e) => editData(e)}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </div>
    </div>
  );
});

export default EditModalContainer;
