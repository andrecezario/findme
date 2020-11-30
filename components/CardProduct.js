import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { Typography, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    maxHeight: 400,
  },
  media: {
    height: 200,
    backgroundSize: 'contain',
  },
  title: {
    fontWeight: 500,
  },
  price: {
    fontWeight: 600,
  }
}));

export default function MediaCard({item}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.link}
        />
        <CardContent>
          <Tooltip title={item.dscProduto}>
            <Typography noWrap className={classes.title} gutterBottom align="center" variant="subtitle1" component="h2">
              {item.dscProduto}
            </Typography>
          </Tooltip>
          <Typography variant="caption" color="textSecondary">
            a partir de 
          </Typography>
          <Typography paragraph noWrap className={classes.price} variant="subtitle1" color="textPrimary">
            R$ {item.valMinimoVendido.toFixed(2)}
          </Typography>
          {/* <Button size="medium" variant="contained" fullWidth color="primary">
            Ver estabelecimentos
          </Button> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
