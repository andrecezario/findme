import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import Link from 'next/link'

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

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
      <InputBase
        className={classes.input}
        value ={parameter}
        onChange={handleChangeParameter}
        placeholder={"Procurar produtos por "+type }
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon style={{fontSize: 32}} />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <Link 
        href={{
          pathname: '/busca',
          query: { q: parameter },
        }} 
        passHref>
        <Button type="submit" color="secondary" variant="contained" className={classes.buttonSearch}>Buscar</Button>
      </Link>
    </Paper>
  );
}
