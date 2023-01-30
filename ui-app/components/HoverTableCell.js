import React from 'react';
import styled from 'styled-components';
import {Table} from "react-bootstrap";

export default styled(Table)({
  "&:hover": {
    backgroundColor: "#B6B6B6!important"
  },
  cursor: "pointer"
})