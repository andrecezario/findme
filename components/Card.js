import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CropFreeIcon from '@material-ui/icons/CropFree';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 220,
  },
  media: {
    height: 80,
    background: theme.palette.secondary.main,
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    background: theme.palette.secondary.main,
    border: 'solid 2px '+theme.palette.secondary.main
  }
}));

export default function MediaCard({ label, icon }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}>
          <Grid style={{height: '100%'}} container justify="center" alignItems="center">
            <Grid item>
              <Avatar className={classes.avatar}  >
                {icon}
              </Avatar>
            </Grid>
          </Grid>
        </CardMedia>
        <CardContent>
          <Typography align="center" gutterBottom variant="h6" component="h2">
            {label}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" fullWidth color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
