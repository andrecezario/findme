// Imports
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button
} from '@material-ui/core'

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    minHeight: 175,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '68%',
  },
  content: {
    flex: '1 0 auto',
  },
  contentImage: {
    backgroundSize: 'contain',
    width: '32%',
  },
  image : {
    width: 120,
    [theme.breakpoints.down('md')]: {  
      width: 80,
    },
    [theme.breakpoints.down('sm')]: {  
      width: 140,
    },    
    [theme.breakpoints.down('xs')]: {  
      width: 80,
    },
  },
  controls: {
    display: 'flex',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  title: {
    fontSize: 18
  }
}));

// Component
export default function MediaControlCard({title, subtitle, image}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant="subtitle1" color="textPrimary">
            <b>{title}</b>
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {subtitle}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Button color="secondary">
            Ver mais
          </Button>
        </div>
      </div>
      <Grid container alignItems="center" justify="center" className={classes.contentImage}>
        <img className={classes.image} src={image} />
      </Grid>
    </Card>
  );
}
