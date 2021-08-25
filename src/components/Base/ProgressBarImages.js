import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function LinearDeterminate(props) {
  const classes = useStyles();

  const { file, setFile, setImageUrl } = props;
  const { url, setProgress } = useStorage(file);
  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (url) {
      setFile(null);
      setProgress(false);
      setImageUrl(url);
    }
  }, [url, setFile]);

  return (
    <div className={classes.root}>
      <LinearProgress color="primary" />
    </div>
  );
}
