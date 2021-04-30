import "./index.css";
import { useState } from "react";
import NavBar from "./components/navbar/NavBar";
import SearchField from "./components/searchField/SearchField";
import AddModal from "./components/modal/AddModal";
import DataTable from "./components/table/DataTable";

import EditModal from "./components/modal/EditModal";

function App() {
  const [doReload, setDoReload] = useState(false);

  return (
    <div className="App">
      <NavBar reload={setDoReload} />
      <SearchField />
      <DataTable doReload={doReload} setDoReload={setDoReload} />
      <AddModal />
      <EditModal />
    </div>
  );
}

export default App;
