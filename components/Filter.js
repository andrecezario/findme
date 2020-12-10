import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Typography,
  Grid,
  Card,
  Divider,
  SvgIcon,
  Slider,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Toolbar,
  AppBar,
  IconButton,
  Fab
} 
from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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
}));

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
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Typography color="textPrimary" variant="subtitle1">
          <b>Tipo</b>
        </Typography>
        <FormControl component="fieldset">
        <RadioGroup value={type} onChange={handleChangeType}>
          <FormControlLabel value="descrição" control={<Radio color="secondary" size="small" />} label="Descrição" />
          <FormControlLabel value="código de barras" control={<Radio color="secondary" size="small" />} label="Código de barras" />
          <FormControlLabel value="estabelecimento" control={<Radio color="secondary" size="small"/>} label="Estabelecimento" />
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
            <SvgIcon color="secondary" width="24" height="24" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </SvgIcon>
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
              color="secondary"
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
            <SvgIcon color="secondary" width="24" height="24" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M15 4H1v8h14V4zM1 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H1z"/>
              <path d="M13 4a2 2 0 0 0 2 2V4h-2zM3 4a2 2 0 0 1-2 2V4h2zm10 8a2 2 0 0 1 2-2v2h-2zM3 12a2 2 0 0 0-2-2v2h2zm7-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
            </SvgIcon>
          </Grid>
          <Grid item xs>
          <Slider
            value={price}
            onChange={handleChangePrice}
            min={0}
            max={10000}
            valueLabelDisplay="auto"
            color="secondary"
          />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
