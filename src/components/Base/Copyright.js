import React from 'react';
import { Link, Typography } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#!">
        Pro Assets
      </Link>{' '}
      2020 - {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
export default Copyright;
