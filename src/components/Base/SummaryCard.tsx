import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  summaryCards: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

interface ISummaryCard {
  title?:string;
  component?: React.ReactNode;
  value?: string;
}

const SummaryCard:React.FC<ISummaryCard> = ({ title, value, component })=> {
  
  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.summaryCard}>
      <Typography color={'textSecondary'} variant="h5" gutterBottom>
        {title}
      </Typography>
      {component || (
        <Typography color={'primary'} variant="h3">
          {value}
        </Typography>
      )}
    </Paper>
  );
}

export default SummaryCard

