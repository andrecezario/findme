import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CropFreeIcon from '@material-ui/icons/CropFree';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore';
import { Grid, Button } from '@material-ui/core';

//Imports
import Search from './Search';
import Card from './Card';
import Card2 from './Card2';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  banner: {
    background: `linear-gradient(15deg, ${theme.palette.primaryLight.main} 20%, ${theme.palette.primary.main} 90%)`,
    height: 340
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.dark.main
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  toolbar: {
    background: theme.palette.dark.main,
    padding: theme.spacing(1)
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
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
    marginBottom: theme.spacing(6)
  }
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider style={{ marginBottom: 10 }} />
      <Typography variant="subtitle1" paragraph align="center" style={{color: '#fff'}}> Filtrar por: </Typography>
      <List>
        <ListItem button>
          <ListItemIcon> <CropFreeIcon style={{color: '#fff'}} /></ListItemIcon>
          <ListItemText primary={<Typography variant="subtitle2" style={{color: '#fff'}}>Código</Typography>} />
        </ListItem>
        <ListItem button>
          <ListItemIcon> <LocalMallIcon style={{color: '#fff'}} /></ListItemIcon>
          <ListItemText primary={<Typography variant="subtitle2" style={{color: '#fff'}}>Descrição</Typography>} />
        </ListItem>
        <ListItem button>
          <ListItemIcon> <LocalConvenienceStoreIcon style={{color: '#fff'}} /></ListItemIcon>
          <ListItemText primary={<Typography variant="subtitle2" style={{color: '#fff'}}>Estabelecimento</Typography>} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h5" noWrap>
            <img src="/images/logotipo.png" width="140"/>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon style={{color: '#fff'}}/> : <ChevronRightIcon style={{color: '#fff'}}/>}
          </IconButton>
        </div>
        <Divider />
        {drawer}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Grid container alignItems="center" justify="center" className={classes.banner}>
          <Grid item xs={10} sm={8}>
          <Typography align="center" paragraph variant="h4" className={classes.titleHome}>
            Encontre os produtos mais baratos da sua região
            </Typography>
            <Search />
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.gridCards} alignItems="center" justify="center">
          <Grid item xs={12} md={4}>
            <Card2 title='Busca por descrição' subtitle='Encontre produtos pelo nome' image='https://www.flaticon.com/svg/static/icons/svg/2282/2282161.svg'/>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card2 title='Busca por código de barras' subtitle='Encontre produtos pelo código de barras' image='https://www.flaticon.com/svg/static/icons/svg/3699/3699606.svg'/>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card2 title='Busca por estabelecimento' subtitle='Encontre produtos pelo estabelecimento' image='https://www.flaticon.com/svg/static/icons/svg/229/229119.svg'/>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
