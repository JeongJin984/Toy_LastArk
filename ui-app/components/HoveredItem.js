import React from 'react';
import styled from 'styled-components';
import { List } from 'semantic-ui-react';

export default styled(List.Item)({
  "&:hover": {
    backgroundColor: "#fafdf3!important",
    opacity: "0.5"
  },
  cursor: "pointer"
})