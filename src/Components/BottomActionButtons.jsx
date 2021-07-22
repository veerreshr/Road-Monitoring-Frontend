import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useStoreActions,useStoreState } from "easy-peasy";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:"1em"
  },
  button: {
    width: "100%",
  },
}));

export default function BottomActionButtons() {
  const classes = useStyles();
  const setStart=useStoreActions((actions)=>actions.upload.setStart);
  const start = useStoreState((state) => state.upload.start);
  useEffect(()=>{},[start])
  return (
    <div className={classes.root}>
      <div style={{padding:"0 0 0.5em 0.5em"}}>Status : <strong>{start?"Running":"Stopped"}</strong></div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={(e)=>{e.preventDefault(); setStart(true)}}
          >
            Start
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={(e)=>{ e.preventDefault();  setStart(false)}}
          >
            Stop
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
