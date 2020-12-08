
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { Container, Typography, Grid, Avatar, Button, Tooltip } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { get, post } from '../services/api';
import { get as get_images, post as post_images} from '../services/api_images';

import Skeleton from '@material-ui/lab/Skeleton';

import CardProduct from '../components/CardProduct2.js'
import Spinner from '../utils/Spinner'
import Menu from '../components/Menu'
import Filter from '../components/Filter'
import Table from '../components/Table'

const useStyles = makeStyles((theme) => ({kgroundSize: 'contain',
  titleSearch: {
    textTransform: 'uppercase',
    fontWeight: 600,
    paddingTop: 16
  },
  title: {
    textTransform: 'capitalize !important',
    fontWeight: 600,
    width: 150
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

export default function Busca() {
  const classes = useStyles();

  const router = useRouter();

  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false)
  const columns =
    [
      { 
        title: 'Descrição',
        field: 'dscProduto',
        render: rowData => colDescricao(rowData)
      },
      { title: 'Valor mínimo (R$)', field: 'valMinimoVendido', type: 'numeric' },
      { title: 'Valor máximo (R$)', field: 'valMaximoVendido', type: 'numeric' },
      { 
        title: 'Estabelecimento',
        field: 'nomFantasia',
        render: rowData => colEstabelecimento(rowData),
      },
      { title: 'Contato', field: 'numTelefone' },
      { title: 'Endereço', field: 'nomLogradouro' }
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

  const getImage = async (dscProduto, codGetin) => {
    const params = {
      key: process.env.REACT_APP_KEY_IMAGENS,
      cx: '7e1513347dbebf77a',
      searchType: 'image',
      q: dscProduto + ' ' + codGetin,
      num: 1
    } 
    const imagens = await get_images('',{ params })
    if (imagens.data.items?.length > 0) {
      return imagens.data.items[0].link
    } 
    return null
  }

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
        <b>Exibindo 1 - 8 de {results.length} resultados</b>
      </Typography>
  </>
  );

  const colDescricao = (rowData) => (
    <>
      <Typography className={classes.title}>
        {rowData.dscProduto.toLowerCase()}
        {/* <Tooltip>
          {rowData.dscProduto}
        </Tooltip> */}
      </Typography>
    </>
  );

  const colEstabelecimento = (rowData) => (
    <Grid container spacing={1} direction="column" alignItems="center" style={{width: 150}}>
      <Grid item>
        <Typography noWrap>
          {rowData.nomFantasia}
        </Typography>
      </Grid>
      <Grid item>
        <Button onClick={()=> alert(rowData.nomFantasia)} color="primary" variant="outlined">
          Conferir
        </Button>
      </Grid>
    </Grid>
  );

  return  (
    <>
      <Spinner loading={loading} />
      <Menu search={true} type={type} parameter={q}/>
      <Grid item xs={12} container spacing={2} justify="space-between" style={{padding: 20}}>
        {/* <Grid item xs={3}>
          <Filter />
        </Grid> */}
        <Grid item xs={12}>
          <Table title={title} columns={columns} data={results} />
        </Grid>
      </Grid>
    </>
  )
}