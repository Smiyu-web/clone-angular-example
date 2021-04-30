import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { TextField } from "@material-ui/core";
import { setSearchItem } from "../../features/searchSlice";

const SeachFieldWrapper = styled.div`
  padding: 8px 24px 20px 24px;
`;

const SearchField = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchItem(e.target.value));
  };

  return (
    <SeachFieldWrapper>
      <TextField
        onChange={handleSearch}
        className="textfield"
        id="standard-search"
        label="Filter Issues"
        type="search"
        color="secondary"
        fullWidth
      />
    </SeachFieldWrapper>
  );
};

export default SearchField;
