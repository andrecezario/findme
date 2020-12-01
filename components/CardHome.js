import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    minHeight: 175,
    // borderLeft: 'solid 5px '+theme.palette.primary.main
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
  },
  content: {
    flex: '1 0 auto',
  },
  contentImage: {
    backgroundSize: 'contain',
    width: '30%',
  },
  image : {
    width: 80,
    [theme.breakpoints.down('md')]: {  
      width: 64,
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
}));

export default function MediaControlCard({title, subtitle, image}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            <b>{title}</b>
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {subtitle}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Button color="primary">
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
