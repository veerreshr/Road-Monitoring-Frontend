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
import { makeStyles } from "@material-ui/core/styles";
import firebase from  "../Utils/firebase"
import LineChartComponent from "./LineChartComponent";
import Math from "./Math";

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
}));

function TestResult() {
  const classes = useStyles();
  const [speed, setSpeed] = useState(30);
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");

  const [values,setValues]=useState({})

  const ptestRef=firebase.database().ref(`pTest/${name}/${vehicle}/${speed}`);
  const getResults=()=>{
    ptestRef.once('value', (data) => {
      const result=data.val();
      // do some stuff once
      setValues(result);
    });
  }
  return (
    <div>
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
            <InputLabel >
              Speed Range
            </InputLabel>
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
            onClick={getResults}
          >
            Visualize
          </Button>
        </Grid>
      </Grid>
      {/* <Math values={values}/> */}
      <div style={{minHeight:"50vh"}}>
      <LineChartComponent values={values}/>
      </div>
    </div>
  );
}

export default TestResult;
