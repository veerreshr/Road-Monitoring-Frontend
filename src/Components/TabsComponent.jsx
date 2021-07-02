import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: "80vh",
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Map" {...a11yProps(0)} />
          <Tab label="Stats" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Display Map with few custom elements to mark on top of our college
        location . Use 2 locations and draw a small line between them on top of
        map. For custom data use any 2 points latitiude and longitude near our
        college. ex point 1 : entrance gate, point 2: dwaraka restaurant
        <br />
        <br />
        <strong>
          Note : Create Separate Components for both tabs, dont directly code
          here
        </strong>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Use any dummy data to display two line charts with both poitive and
        negative values
        <br />
        <br />
        <strong>
          Note : Create Separate Components for both tabs, dont directly code
          here
        </strong>
      </TabPanel>
    </div>
  );
}
