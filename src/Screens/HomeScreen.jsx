import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MapContainer from './../Components/MapComponent';



const useStyles = makeStyles((theme) => ({
  buttonsContainer: {
    marginTop:"1em"
  },
  button: {
    width: "100%",
  },
}));

function HomeScreen() {


  const [start,setStart]=useState(false)
  const classes = useStyles();
  return (
    <div>
      <MapContainer start={start}/>
      <Grid container spacing={2} className={classes.buttonsContainer}>
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

export default HomeScreen;
