import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    width: "100%",
  },
}));

export default function BottomActionButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Start
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Stop
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
