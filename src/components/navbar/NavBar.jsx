import React from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import styled from "styled-components";

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 16px;

  background-color: #3f51b5;
  color: white;
  font-size: 10px;
  font-weight: 200;

  .reload {
    display: flex;
    align-items: center;
  }

  .reloadData {
    margin-right: 5px;
  }
`;

const NavBar = ({ reload }) => {
  const pointer = { cursor: "pointer" };

  return (
    <NavBarContainer>
      <div>
        <h1>Angular 9 MatTable CRUD Example</h1>
      </div>
      <div className="reload">
        <h1 className="reloadData">Reload data:</h1>
        <RefreshIcon style={pointer} onClick={() => reload(true)} />
      </div>
    </NavBarContainer>
  );
};

export default NavBar;
