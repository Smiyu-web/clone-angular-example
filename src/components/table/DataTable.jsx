import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

import Paper from "@material-ui/core/Paper";
import DataTableContainer from "./TableHeadContainer";
import { setEditId, setIsOpenEdit } from "../../features/dataSlice";
import { db } from "../../firebase/firebase";
import { selectSearchItem } from "../../features/searchSlice";
import { setListData, selectListData } from "../../features/dataSlice";
import Loading from "../../components/loading/Loading";

// ---------------------------------------------------- table ----------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 550,
  },
  tableCell: {
    padding: "20px 0 20px 10px",
  },
  icon: {
    cursor: "pointer",
    color: "#e91e63",
  },
}));

function EnhancedTable(props) {
  const searchItem = useSelector(selectSearchItem);
  const listData = useSelector(selectListData);

  const dispatch = useDispatch();
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    db.collection("datas")
      .orderBy("updatedDate", "desc")
      .onSnapshot((snapshot) => {
        dispatch(
          setListData(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: {
                ...doc.data(),
                createdDate: doc.data().createdDate?.seconds,
                updatedDate: doc.data().updatedDate?.seconds,
              },
            }))
          )
        );
      });

    props.setDoReload(false);
  }, [props.doReload]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    db.collection("datas").doc(id).delete();
  };

  const handleOpen = (id) => {
    dispatch(setIsOpenEdit());
    dispatch(setEditId(id));
  };

  const convertDate = (secs) => {
    const d = new Date(0);
    d.setSeconds(secs);
    return d.toLocaleString("en-CA", { timeZone: "America/Vancouver" });
  };

  const filterData = (arr) => {
    if (searchItem) {
      return arr.filter((item) => {
        if (item.data.title.toLowerCase().includes(searchItem.toLowerCase())) {
          return 1;
        } else if (item.id.toLowerCase().includes(searchItem.toLowerCase())) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      return arr;
    }
  };

  if (listData.length <= 0) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <DataTableContainer classes={classes} rowCount={listData.length} />
            <TableBody>
              {filterData(listData).map((row, index) => (
                <TableRow hover tabIndex={-1} key={row.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                    className={classes.tableCell}
                  >
                    {row.id}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                    align="left"
                    className={classes.tableCell}
                  >
                    {row.data.title}
                  </TableCell>
                  <TableCell component="th" align="left">
                    {row.data.itemState}
                  </TableCell>
                  <TableCell component="th" padding="none" align="left">
                    {row.data.url}
                  </TableCell>
                  <TableCell component="th" padding="none" align="right">
                    {convertDate(row.data.createdDate)}
                  </TableCell>
                  <TableCell component="th" padding="none" align="right">
                    {convertDate(row.data.updatedDate)}
                  </TableCell>
                  <TableCell component="th" padding="none" align="center">
                    <CreateIcon
                      className={classes.icon}
                      onClick={() => handleOpen(row.id)}
                    />
                  </TableCell>
                  <TableCell component="th" padding="none" align="center">
                    <DeleteIcon
                      className={classes.icon}
                      onClick={() => handleDelete(row.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={listData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default EnhancedTable;
