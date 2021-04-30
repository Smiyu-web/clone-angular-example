import React from "react";
import { useDispatch } from "react-redux";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";

import { headCells } from "./headCells";
import { setIsOpen } from "../../features/dataSlice";

const DataTableContainer = () => {
  const dispatch = useDispatch();

  const icon = { cursor: "pointer", color: "#3f51b5" };
  const title = { color: "#757575", fontSize: "13px" };

  const handleOpen = () => {
    dispatch(setIsOpen());
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} style={title}>
            {headCell.label}
          </TableCell>
        ))}
        <TableCell>
          <AddIcon style={icon} onClick={handleOpen} />
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default DataTableContainer;
