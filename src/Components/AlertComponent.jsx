import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
//types : error, warning, info, success
export default function AlertComponent({type="error",data}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity={type}>
        <AlertTitle>Error</AlertTitle>
        {data}
      </Alert>
    </div>
  );
}
