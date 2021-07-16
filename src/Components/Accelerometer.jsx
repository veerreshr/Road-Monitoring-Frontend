import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,Button
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AlertComponent from "./AlertComponent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grid:{
    marginTop: theme.spacing(1),
  },
    formControl: {
    display: "block",
    width: "100%",
  },
  input:{
      width:"100%"
  }
}));

function AccelerometerComponent() {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [active, setActive] = useState(false);
  const [value, setValue] = useState([]);

  const [start,setStart]=useState(false);
  const [speed, setSpeed] = useState();
  const acl = new Accelerometer({ frequency: 30 });
  useEffect(() => {
    (async function () {
      try {
        if ("Accelerometer" in window) {
          const { state } = await navigator.permissions.query({
            name: "accelerometer",
          });
          console.log(state);
          if (state !== "granted") {
            console.warn(
              "You haven't granted permission to use the Accelerometer sensor"
            );
            setError("Please grant the permission to use sensors!");
            return;
          }
          acl.addEventListener("activate", () => {
            setActive(true);
          });
          acl.addEventListener("error", (err) => {
            console.error(`Error: ${err.name}`);
            setError(`Error: ${err.name}`);
          });
          acl.addEventListener("reading", () => {
            setValue([...value,{
              x: acl.x,
              z: acl.z,
            }]);
          });
          if(start){
              acl.start();
          }else{
              if(value!=[]){
                  console.log(value);
              }
          }
          setTimeout(()=>{
              acl.stop();
              setStart(false);
          },5000)

        } else {
          console.error(
            "Sorry! Your browser doesn't support usage of sensors."
          );
          setError("Sorry! Your browser doesn't support usage of sensors.");
        }
      } catch (err) {
        // Handle construction errors.
        if (err.name === "SecurityError") {
          console.log(
            "Sensor construction was blocked by the Permissions Policy."
          );
          setError( "Sensor construction was blocked by the Permissions Policy.");

        } else if (err.name === "ReferenceError") {
          console.log("Sensor is not supported by the User Agent.");
          setError("Sensor is not supported by the User Agent.");

        } else {
          throw err;
        }
      }
    })();
  }, [start]);

  const startRecording = () => {
      setStart(true);
  };

  return (
    <div>
      {error && <AlertComponent data={error} />}
      {/* {active && (
        <div>
          <p>X : {value.x}</p>
          <p>Z : {value.z}</p>
        </div>
      )} */}
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} md={4}>
          <TextField id="outlined-basic" label="Name" variant="outlined" className={classes.input} />
        </Grid>
        <Grid item xs={12} md={4}>
          {" "}
          <TextField
            id="outlined-basic"
            label="Vehicle Name + Model"
            variant="outlined" className={classes.input}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" className={classes.formControl} >
            <InputLabel id="demo-simple-select-outlined-label">Speed Range</InputLabel>
            <Select
            className={classes.input}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={speed}
              onChange={(e) => {
                setSpeed(e.target.value);
              }}
              label="Speed Range"
            >
              <MenuItem value={10}>0-10</MenuItem>
              <MenuItem value={20}>11-20</MenuItem>
              <MenuItem value={30}>21-30</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} >
          <Button variant="contained" color="primary" className={classes.input} onClick={startRecording}>
            Start Recording
          </Button>
          </Grid>
      </Grid>
      {value!=[] && value}
    </div>
  );
}

export default AccelerometerComponent;
