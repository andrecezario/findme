import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { 
  Container,
  Typography,
  Grid,
  Avatar,
  Button,
  Tooltip,
  SvgIcon,
  IconButton,
  Drawer,
  Fab,
  Dialog
} from "@material-ui/core";

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import PropTypes from 'prop-types';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import { get, post } from '../services/api';
import { get as get_images, post as post_images} from '../services/api_images';

import Skeleton from '@material-ui/lab/Skeleton';

import Spinner from '../utils/Spinner'
import Menu from '../components/Menu'
import Filter from '../components/Filter'
import Table from '../components/Table'
import Map from '../components/Map'

import { withScriptjs } from 'react-google-maps'
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
    paddingTop: 16
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
          <CloseIcon />
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
  const [coordinates, setCoordinates] = React.useState({})

  const MapLoader = withScriptjs(Map(coordinates));

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
        type: 'numeric',
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
        const produtos = retorno.data

        for(let produto of produtos) {
          // produto.link = await getImage(produto.dscProduto, produto.codGetin)
            produto.link = 'https://react.semantic-ui.com/images/wireframe/white-image.png'
        }

        setResults(produtos) 
        sortResults()
        setLoading(false)
      }
    }

    await request();

  }, []);

  // const getImage = async (dscProduto, codGetin) => {
  //   const params = {
  //     key: process.env.REACT_APP_KEY_IMAGENS,
  //     cx: '7e1513347dbebf77a',
  //     searchType: 'image',
  //     q: dscProduto + ' ' + codGetin,
  //     num: 1
  //   } 
  //   const imagens = await get_images('',{ params })
  //   if (imagens.data.items?.length > 0) {
  //     return imagens.data.items[0].link
  //   } 
  //   return null
  // }

  const sortResults = () => {
    results.sort(function (a, b) {
      if (a.valMinimoVendido.toFixed(2) > b.valMinimoVendido.toFixed(2)) {
        return 1;
      }
      if (a.valMinimoVendido.toFixed(2) < b.valMinimoVendido.toFixed(2)) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }

  const title = (
    <>
      <Typography className={classes.titleSearch} variant="h6" component="h6">
        Resultados da busca para "{q}"
      </Typography>
      <Typography color="textSecondary" variant="body2" paragraph>
        <b>{results.length} encontrados</b>
      </Typography>
  </>
  );

  const colDescricao = (rowData) => (
    <>
      <Typography variant="body2" className={classes.title}>
        {rowData.dscProduto.toLowerCase()}
        {/* <Tooltip>
          {rowData.dscProduto}
        </Tooltip> */}
      </Typography>
    </>
  );

  const colEstabelecimento = (rowData) => (
    <Grid container spacing={1} direction="row" justify="space-between" alignItems="center" style={{paddingRight: 20}}>
      <Grid item xs={9}>
        <Typography variant="body2" className={classes.text} noWrap>
          {rowData.nomFantasia ? rowData.nomFantasia.toLowerCase() : rowData.nomRazaoSocial ? rowData.nomRazaoSocial.toLowerCase() : '-'}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Button 
          size="small"
          onClick={()=> alert(rowData.nomFantasia)}
          color="primary"
          variant="outlined"
          startIcon={<SvgIcon color="primary" width="24" height="24" viewBox="0 0 16 16">
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                      <path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    </SvgIcon>}
          >
          Conferir   
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
    <Grid container spacing={1} justify="space-between" alignItems="center" direction="row" style={{minWidth: 200}}  >
      <Grid item xs={9}>
        <Typography variant="body2" className={classes.text}>
          {(rowData.nomLogradouro+', '+rowData.numImovel+' - '+rowData.nomBairro+' , '+rowData.nomMunicipio+' - AL , '+rowData.numCep).toLowerCase()}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Button 
          onClick={handleClickOpen}
          // onClick={() => alert(rowData.numLatitude+','+rowData.numLongitude)}
          startIcon={<SvgIcon color="primary" width="24" height="24" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/>
                    </SvgIcon>}
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

  const handleClickOpen = () => {
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
    setCoordinates({...coordinates, latOrigin: position.coords.latitude,  lgnOrigin: position.coords.longitude }) 
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
          <SvgIcon width="24" height="24" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
          </SvgIcon>
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
          <DialogTitle onClose={handleClose}>
            Mapa
          </DialogTitle>
          <DialogContent dividers>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <MapLoader
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_GOOGLE_MAPS}`}
                  loadingElement={<div style={{ height: `100%` }} />}
                />
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
        <ScrollTop {...props}>
          <Fab color="secondary" size="small">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Grid>
    </>
  )
}