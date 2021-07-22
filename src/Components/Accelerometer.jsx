import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import AlertComponent from "./AlertComponent";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../Utils/firebase";
import { useCountdownTimer } from "use-countdown-timer";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: theme.spacing(1),
  },
  formControl: {
    display: "block",
    width: "100%",
  },
  input: {
    width: "100%",
  },
  countdown: {
    fontSize: "2em",
  },
}));

function AccelerometerComponent() {
  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: 1000 * 5,
  });

  const classes = useStyles();
  const [error, setError] = useState("");
  const [active, setActive] = useState(false);

  const [speed, setSpeed] = useState("");
  const [name, setName] = useState();
  const [vehicle, setVehicle] = useState();
  const acl = new Accelerometer({ frequency: 30 });

  const startReading = async () => {
    const ptestRef = firebase
      .database()
      .ref(`pTest/${name}/${vehicle}/${speed}`);
    try {
      if ("Accelerometer" in window) {
        const { state } = await navigator.permissions.query({
          name: "accelerometer",
        });
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
          ptestRef.push({
            x: acl.x,
            z: acl.z,
            timestamp: acl.timestamp,
          });
        });
        acl.start();
        setTimeout(() => {
          acl.stop();
          alert("Test Complete");
          // setValue(values)
        }, 10000);
      } else {
        console.error("Sorry! Your browser doesn't support usage of sensors.");
        setError("Sorry! Your browser doesn't support usage of sensors.");
      }
    } catch (err) {
      if (err.name === "SecurityError") {
        console.warn(
          "Sensor construction was blocked by the Permissions Policy."
        );
        setError("Sensor construction was blocked by the Permissions Policy.");
      } else if (err.name === "ReferenceError") {
        console.warn("Sensor is not supported by the User Agent.");
        setError("Sensor is not supported by the User Agent.");
      } else {
        throw err;
      }
    }
  };

  if (countdown == 0) {
    startReading();
  }

  return (
    <div>
      {error && <AlertComponent data={error} />}
      {!error && (
        <div className={classes.countdown}>Start Countdown : {countdown}</div>
      )}
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Name"
            variant="outlined"
            className={classes.input}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          {" "}
          <TextField
            label="Vehicle Name + Model"
            variant="outlined"
            className={classes.input}
            value={vehicle}
            onChange={(e) => {
              setVehicle(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Speed Range</InputLabel>
            <Select
              className={classes.input}
              labelId="demo-simple-select-outlined-label"
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
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            className={classes.input}
            onClick={start}
          >
            Start Recording
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default AccelerometerComponent;
