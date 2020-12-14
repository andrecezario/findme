// Imports
import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Grid,
  InputBase
} from '@material-ui/core'

import { BiCartAlt, BiSearch } from "react-icons/bi";
import Link from 'next/link'

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    background: theme.palette.dark.main
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  logo: {
    width: 120,
    [theme.breakpoints.down('sm')]: {
      width: 80
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%'
  },
}));

// Component
export default function MenuAppBar({search = false, type = 'descrição', parameter}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar id="back-to-top-anchor">
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={3}>
              <Typography variant="h6">
                <Link href="/">
                  <Button>
                    <img src="/images/logo.png" className={classes.logo} />
                  </Button>
                </Link>
              </Typography>
            </Grid>
            {search && 
            <Grid item xs={6}> 
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <BiSearch />
                </div>
                <InputBase
                  value={parameter}
                  placeholder={"Procurar produtos por "+type}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div> 
            </Grid>
            }
            <Grid item>
              <div>
                <IconButton
                  color="inherit"
                >
                  <BiCartAlt size="32" />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
