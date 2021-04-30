import React from "react";
import AddModal from "../article/modal/AddModal";
import NavBar from "../navbar/NavBar";
import SearchField from "../searchField/SearchField";
import DataTable from "../table/DataTable";

const Main = () => {
  return (
    <div>
      <NavBar />
      <SearchField />
      <DataTable />
      <AddModal />
    </div>
  );
};

export default Main;
