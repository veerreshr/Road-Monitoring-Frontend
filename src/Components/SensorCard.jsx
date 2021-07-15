import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SensorCard({x,y,z,lat,long,timestamp}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Device data
        </Typography>
        <Typography variant="body2" component="p">
          X : {x}
        </Typography>
        <Typography variant="body2" component="p">
          Y : {y}
        </Typography>
        <Typography variant="body2" component="p">
          Z : {z}
        </Typography>
        <Typography variant="body2" component="p">
          Lat : {lat}
        </Typography>
        <Typography variant="body2" component="p">
          Long : {long}
        </Typography>
        <Typography variant="body2" component="p">
          Timestamp : {timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}

