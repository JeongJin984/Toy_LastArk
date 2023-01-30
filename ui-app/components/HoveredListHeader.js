import React from 'react';
import styled from 'styled-components';
import { List } from 'semantic-ui-react';

export default styled(List.Item)({
  "&:hover": {
    backgroundColor: "#fdfdf8!important"
  },
  cursor: "pointer"
})