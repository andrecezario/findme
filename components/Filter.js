// Imports
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Typography,
  Grid,
  Divider,
  Slider,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Toolbar,
  AppBar,
  IconButton
} 
from '@material-ui/core';

import { BiX, BiMap, BiMoney } from "react-icons/bi";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    background: '#fff'
  },
  contentFilter: {
    marginBottom: theme.spacing(2)
  },
  fab: {
    position: 'absolute',
    color: '#fff',
    right: theme.spacing(1),
  },
  icon: {
    color: theme.palette.primary.main
  }
}));

// Component
export default function Filter({close}) {
  const classes = useStyles();

  const [distance, setDistance] = React.useState(0);
  const [price, setPrice] = React.useState(1);
  const [type, setType] = React.useState(0);

  const handleChangeDistance = (event, newValue) => {
    setDistance(newValue);
  };

  const handleChangePrice = (event, newValue) => {
    setPrice(newValue);
  };

  const handleChangeType = (event, newValue) => {
    setType(newValue);
  };

  return (
    <>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" component="h6">
            Filtros
          </Typography>
          <IconButton className={classes.fab} onClick={close}>
            <BiX size="28" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Typography color="textPrimary" variant="subtitle1">
          <b>Tipo</b>
        </Typography>
        <FormControl component="fieldset">
        <RadioGroup value={type} onChange={handleChangeType}>
          <FormControlLabel value="descrição" control={<Radio color="primary" size="small" />} label="Descrição" />
          <FormControlLabel value="código de barras" control={<Radio color="primary" size="small" />} label="Código de barras" />
          <FormControlLabel value="estabelecimento" control={<Radio color="primary" size="small"/>} label="Estabelecimento" />
        </RadioGroup>
        </FormControl>

        <Divider style={{ marginTop: 16, marginBottom: 16 }}/>

        <Typography color="textPrimary" variant="subtitle1">
          <b>Distância</b>
        </Typography>
        <Typography color="textSecondary" variant="caption" paragraph>
          De 1 km até 15 km
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <BiMap className={classes.icon} size="24" />
          </Grid>
          <Grid item xs>
            <Slider 
              value={distance}
              step={1}
              marks
              min={1}
              max={15}
              valueLabelDisplay="auto"
              onChange={handleChangeDistance}
              color="primary"
              />
          </Grid>
        </Grid>

        <Divider style={{ marginTop: 16, marginBottom: 16 }}/>

        <Typography color="textPrimary" variant="subtitle1">
          <b>Preço</b>
        </Typography>
        <Typography color="textSecondary" variant="caption" paragraph>
          De R$ 0,00 até R$ 10.000,00
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <BiMoney className={classes.icon} size="24" />
          </Grid>
          <Grid item xs>
          <Slider
            value={price}
            onChange={handleChangePrice}
            min={0}
            max={10000}
            valueLabelDisplay="auto"
            color="primary"
          />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
