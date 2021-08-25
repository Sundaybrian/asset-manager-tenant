import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import Content from '../Container/Content';

function Loader() {
  return (
    <Content>
      <Grid container justify="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </Content>
  );
}

export default Loader;
