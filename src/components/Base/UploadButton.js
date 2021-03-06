import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function UploadButton(props) {
  const classes = useStyles();
  const { imageChangeHandler, title } = props;

  return (
    <div className={classes.root}>
      <input
        name="image_url"
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        onChange={imageChangeHandler}
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="outlined" color="default" component="span" startIcon={<PhotoCamera />} fullWidth>
          {title}
        </Button>
      </label>
    </div>
  );
}
