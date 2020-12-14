import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

//Imports
import Search from './Search';
import CardHome from './CardHome';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  banner: {
    background: `linear-gradient(15deg, ${theme.palette.primaryLight.main} 20%, ${theme.palette.primary.main} 90%)`,
    height: 340
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    background: theme.palette.dark.main,
    padding: theme.spacing(1)
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  gridCards: {
    padding: theme.spacing(3),
    width: '100%'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  titleHome: {
    color: theme.palette.light.main,
    marginBottom: theme.spacing(6),
    fontWeight: 600,
    fontSize: 25
  }
}));

// Component
export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main
        className={classes.content}
      >
        <div className={classes.drawerHeader} />
        <Grid container alignItems="center" justify="center" className={classes.banner}>
          <Grid item xs={10} sm={8}>
          <Typography align="center" paragraph variant="h4" component="h6" className={classes.titleHome}>
            Encontre os produtos mais baratos da sua região
            </Typography>
            <Search />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.gridCards} alignItems="center" justify="center">
          <Grid item xs={12} md={4}>
            <CardHome title='Busca por descrição' subtitle='Encontre produtos pelo nome' image='/images/descricao.svg'/>
          </Grid>
          <Grid item xs={12} md={4}>
            <CardHome title='Busca por código de barras' subtitle='Encontre produtos pelo código de barras' image='/images/codigo.svg'/>
          </Grid>
          <Grid item xs={12} md={4}>
            <CardHome title='Busca por estabelecimento' subtitle='Encontre produtos pelo estabelecimento' image='/images/estabelecimento.svg'/>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
