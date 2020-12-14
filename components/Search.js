// Imports
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Select,
  MenuItem,
  FormControl,
  Button,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Hidden
} 
  from '@material-ui/core';

import Link from 'next/link'
import { BiSearch, BiSearchAlt } from "react-icons/bi";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 60
  },
  input: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      fontSize: 18,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: theme.palette.primary.main
  },
  buttonSearch: {
    [theme.breakpoints.up('sm')]: {
      minWidth: 128,
      padding: '0 30px',
    },
    background: `linear-gradient(15deg, ${theme.palette.secondaryDark.main} 20%, ${theme.palette.secondary.main} 90%)`,
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    textTransform: 'capitalize',
    fontSize: 16
  },
  divider: {
    height: 28,
    margin: 4,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// Components
export default function CustomizedInputBase() {
  const classes = useStyles();

  const [type, setType] = React.useState('descrição');
  const [parameter, setParameter] = React.useState('');

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeParameter = (event) => {
    setParameter(event.target.value);
  };

  return (
    <Paper component="form" className={classes.root}>
      <Hidden smDown>
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            onChange={handleChangeType}
            disableUnderline
          >
            <MenuItem value={'descrição'}>Descrição</MenuItem>
            <MenuItem value={'código de barras'}>Código de Barras</MenuItem>
            <MenuItem value={'estabelecimento'}>Estabelecimento</MenuItem>
          </Select>
        </FormControl>
        <Divider className={classes.divider} orientation="vertical" />
      </Hidden>
      <InputBase
        className={classes.input}
        value ={parameter}
        onChange={handleChangeParameter}
        placeholder={"Procurar produtos por "+type }
      />
      <Hidden smDown>
        <Link 
          href={{
            pathname: '/busca',
            query: { q: parameter },
          }} 
          passHref>
          <IconButton type="submit" className={classes.iconButton}>
            <BiSearchAlt />
          </IconButton>
        </Link>
        <Divider className={classes.divider} orientation="vertical" />
        <Link 
          href={{
            pathname: '/busca',
            query: { q: parameter },
          }} 
          passHref>
          <Button type="submit" color="secondary" variant="contained" className={classes.buttonSearch}>
            <b>Buscar</b>
          </Button>
        </Link>
      </Hidden>
      <Hidden mdUp>
        <Link 
          href={{
            pathname: '/busca',
            query: { q: parameter },
          }} 
          passHref>
          <Button type="submit" color="secondary" variant="contained" className={classes.buttonSearch}>
            <BiSearch size="24"/>
          </Button>
        </Link>
      </Hidden>
    </Paper>
  );
}
