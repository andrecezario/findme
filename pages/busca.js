// Imports
import React, { Component, useEffect, useState } from "react";
import { useRouter } from "next/router"
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/ducks/coordinates';

import { 
  Typography,
  Grid,
  Button,
  IconButton,
  Drawer,
  Fab,
  Dialog,
  Hidden
} from "@material-ui/core";

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

import { BiX, BiFilterAlt, BiShowAlt, BiMap, BiChevronUp } from "react-icons/bi";
import { MdAddShoppingCart } from "react-icons/md";

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import PropTypes from 'prop-types';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import { post } from '../services/api';

import Spinner from '../utils/Spinner'
import Menu from '../components/Menu'
import Filter from '../components/Filter'
import Table from '../components/Table'
import Map from '../components/Map'

import { withScriptjs } from 'react-google-maps'

// Styles
const drawerWidth = 300;

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
  },
  dialogTitle: {
    background: theme.palette.primary.main,
    color: '#fff'
  },
  contBtnFilter: {
    position: 'fixed',
    zIndex: 1111,
    right: 0,
    top: '30%',
  },
  btnFilter: {
    borderRadius: '100%',
    padding: 0, 
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    width: 64,
    height: 64
  },
  btnTop: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  titleSearch: {
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  title: {
    textTransform: 'capitalize !important',
    fontWeight: 600,
    width: '100%'
  },
  text: {
    textTransform: 'capitalize !important',
    textAlign: 'left'
  },
  contSkeleton: {
    marginBottom: theme.spacing(3),
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  centerSkeleton: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center",
  },
  imgSkeleton: {
    [theme.breakpoints.up("sm")]: {
      height: "345px !important",
    },
    [theme.breakpoints.down("sm")]: {
      height: "175px !important",
    },
  },
}));

// Component
function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.btnTop}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <BiX />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function Busca(props) {
  const classes = useStyles();

  const router = useRouter();

  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false)
  const coordinates = useSelector((state) => state.coordinates);
  const dispatch = useDispatch();

  const MapLoader = withScriptjs(Map)

  const columns =
    [
      { 
        title: 'Descrição',
        field: 'dscProduto',
        render: rowData => colDescricao(rowData)
      },
      { 
        title: 'Valor',
        field: 'valMinimoVendido',
        render: rowData => colValores(rowData)
      },
      { 
        title: 'Estabelecimento',
        field: 'nomFantasia',
        render: rowData => colEstabelecimento(rowData),
      },
      { 
        title: 'Endereço',
        field: 'nomLogradouro',
        render: rowData => colEndereco(rowData),
      }
    ]

  const images = []

  const {
      query: { q, type },
   } = router

  let data = {
    descricao: '',
    dias: 3,
    latitude: -9.6432331,
    longitude: -35.7190686,
    raio: 5
  }
  
 useEffect(async () => {
    setLoading(true)
    data.descricao =  q
    const request = async () => {
      const retorno =  await post('consultarPrecosPorDescricao', data)
      if (retorno.status === 200) {
        setResults(retorno.data) 
        sortResults()
        setLoading(false)
      }
    }

    await request();

  }, []);

  const sortResults = () => {
    results.sort(function (a, b) {
      if (a.valMinimoVendido.toFixed(2) > b.valMinimoVendido.toFixed(2)) {
        return 1;
      }
      if (a.valMinimoVendido.toFixed(2) < b.valMinimoVendido.toFixed(2)) {
        return -1;
      }
      return 0;
    });
  }

  const title = (
    <>
      <Hidden smDown>
        <Typography className={classes.titleSearch} variant="h6" component="h6">
          Resultados da busca para "{q}"
        </Typography>
        <Typography color="textSecondary" variant="body2" paragraph>
          <b>{results.length} encontrados</b>
        </Typography>
      </Hidden>
    </>
  );

  const colDescricao = (rowData) => (
    <Grid container spacing={1} direction="row" justify="space-between" alignItems="center" style={{ minWidth: 350,  paddingRight: 20}}>
      <Grid item xs={12} sm={9}>
        <Typography variant="body2" color="primary" className={classes.title}>
          {rowData.dscProduto.toLowerCase()}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button 
          size="small"
          onClick={()=> alert(rowData.dscProduto)}
          color="primary"
          variant="outlined"
          startIcon={<MdAddShoppingCart />}
          >
          Adicionar   
        </Button>
      </Grid>
    </Grid>
  );

  const colEstabelecimento = (rowData) => (
    <Grid container spacing={1} direction="row" justify="space-between" alignItems="center" style={{paddingRight: 20}}>
      <Grid item xs={12} lg={9}>
        <Typography variant="body2" className={classes.text} noWrap>
          {rowData.nomFantasia ? rowData.nomFantasia.toLowerCase() : rowData.nomRazaoSocial ? rowData.nomRazaoSocial.toLowerCase() : '-'}
        </Typography>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Button 
          size="small"
          onClick={()=> alert(rowData.nomFantasia)}
          color="primary"
          variant="outlined"
          startIcon={<BiShowAlt />}
          >
          Ver   
        </Button>
      </Grid>
    </Grid>
  );

  const colValores = (rowData) => (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="body2" color="textPrimary">
          {rowData.valMinimoVendido === rowData.valMaximoVendido ? 
           <b>{rowData.valMinimoVendido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</b>
          : <>
            <Typography variant="caption" color="textPrimary">De </Typography>
            <b>{rowData.valMinimoVendido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</b>
            <Typography variant="caption" color="textPrimary"> à </Typography>
            <b>{rowData.valMaximoVendido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</b>
            </>}
        </Typography>
      </Grid>
    </Grid>
  )

  const colEndereco = (rowData) => (
    <Grid container spacing={1} justify="space-between" alignItems="center" direction="row" style={{ minWidth: 200, paddingRight: 20}}  >
      <Grid item xs={12} lg={9}>
        <Typography variant="body2" className={classes.text}>
          {(rowData.nomLogradouro+', '+rowData.numImovel+' - '+rowData.nomBairro+' , '+rowData.nomMunicipio+' - AL , '+rowData.numCep).toLowerCase()}
        </Typography>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Button 
          onClick={() => {
            handleClickOpen(rowData.numLatitude, rowData.numLongitude)
            }
          }
          startIcon={<BiMap />}
          color="primary"
          variant="outlined"
          >
        Ir
        </Button>
      </Grid>
    </Grid>
  )

  const anchor = 'right'
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (numLatitude, numLongitude) => {
    dispatch(actions.set({ latDestination: numLatitude, lgnDestination: numLongitude }));
    getLocation()
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition,showError);
    } else {
    alert("Seu browser não suporta Geolocalização.");
    }
  }
  
  function showPosition(position) {
    dispatch(actions.set({ latOrigin: position.coords.latitude, lgnOrigin: position.coords.longitude }))
  }

  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
       alert("Usuário rejeitou a solicitação de Geolocalização.")
        break;
      case error.POSITION_UNAVAILABLE:
       alert("Localização indisponível.")
        break;
      case error.TIMEOUT:
       alert("A requisição expirou.")
        break;
      case error.UNKNOWN_ERROR:
       alert("Algum erro desconhecido aconteceu.")
        break;
    }
  }

  return  (
    <>
      <Spinner loading={loading} />
      <Menu search={true} type={type} parameter={q}/>
      <div className={classes.contBtnFilter}>
        <Fab
          variant="extended"
          color="secondary"
          onClick={toggleDrawer(anchor, true)}
          className={classes.btnFilter}
        >
          <BiFilterAlt size="32" />
        </Fab>
      </div>
      <Grid item xs={12} container spacing={2} justify="space-between" style={{padding: 20}}>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          classes={{
            paper: classes.drawerPaper,
          }}
          >
          <Filter close={toggleDrawer(anchor, false)} />
        </Drawer>
        <Grid item xs={12}>
          <Table title={title} columns={columns} data={results} />
        </Grid>

        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='sm'>
          <DialogTitle onClose={handleClose} className={classes.dialogTitle}>
            <Typography variant="h6">
              Rota da sua localização até o estabelecimento
            </Typography>
          </DialogTitle>
          <DialogContent dividers style={{height: 550, overflowY: "hidden"}}>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <MapLoader
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_GOOGLE_MAPS}`}
                  loadingElement={<div style={{ height: "100%" }} />}
                />
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
        <ScrollTop {...props}>
          <Fab color="secondary" size="small">
            <BiChevronUp size="32" />
          </Fab>
        </ScrollTop>
      </Grid>
    </>
  )
}