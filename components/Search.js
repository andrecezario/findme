import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 64
  },
  input: {
    marginLeft: theme.spacing(1),
    fontSize: 18,
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: theme.palette.primary.main
  },
  buttonSearch: {
    height: '100%',
    minWidth: 128,
    background: `linear-gradient(15deg, ${theme.palette.secondaryDark.main} 20%, ${theme.palette.secondary.main} 90%)`,
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    textTransform: 'capitalize',
    fontSize: 16
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Procurar produtos por descrição"
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon style={{fontSize: 32}} />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <Button color="secondary" variant="contained" className={classes.buttonSearch}>Buscar</Button>
    </Paper>
  );
}
