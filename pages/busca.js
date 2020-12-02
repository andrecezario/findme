
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { Container, Typography, Grid, Avatar, Tooltip } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { get, post } from '../services/api';
import { get as get_images, post as post_images} from '../services/api_images';
import Pagination from '@material-ui/lab/Pagination';

import Skeleton from '@material-ui/lab/Skeleton';

import CardProduct from '../components/CardProduct.js'
import Spinner from '../utils/Spinner'
import Menu from '../components/Menu'
import Filter from '../components/Filter'

const useStyles = makeStyles((theme) => ({kgroundSize: 'contain',
  titleSearch: {
    textTransform: 'uppercase',
    fontWeight: 600
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
  const [resultsPagination, setResultsPagination] = React.useState([]);
  const [pagination, setPagination] = React.useState({page: 1, start: 0, end: 8 })
  const [loading, setLoading] = React.useState(false)

  const handleChangePage = (event, value) => {
    const start = 8 * (value-1)
    const end = 8 * value

    setPagination({ 
      page: value,
      start: start,
      end: end
    })
  };

  useEffect(() => {
    setResultsPagination(results.slice(pagination.start, pagination.end))
  }, [pagination])

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
        setPagination({ 
          page: 1,
          start: 0,
          end: 8
        })
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

  // const results = [
  //   {
  //     dscProduto: 'Moletom Azul',
  //     codGetin: '78961346689',
  //     valMinimoVendido: 159.99,
  //     link: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F136%2F459%2Fmockup-ae9a83b0__49881.1603746586.png&w=1920&q=85'
  //   },
  //   {
  //     dscProduto: 'Moletom Cinza',
  //     codGetin: '78961346599',
  //     valMinimoVendido: 259.99,
  //     link: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F130%2F442%2Fmockup-8ee910d1__57199.1603747525.png&w=1920&q=85'
  //   },
  //   {
  //     dscProduto: 'Moletom Bomber Verde',
  //     codGetin: '78461346689',
  //     valMinimoVendido: 189.99,
  //     link: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F125%2F420%2Fmockup-7500e8eb__78586.1601229597.png&w=1920&q=85'
  //   },
  //   {
  //     dscProduto: 'Camisa Moletom Cinza',
  //     codGetin: '78961346611',
  //     valMinimoVendido: 99.99,
  //     link: 'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F131%2F444%2Fmockup-5197eac5__60260.1601231192.png&w=1920&q=85'
  //   }
  // ]

  const skeleton = (
    results.length == 0 && [0, 1, 2, 3, 4, 5, 6, 7].map(() => (
    <Grid item xs={3}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Skeleton
          variant="circle"
          height={80}
          width={80}
          className={classes.centerSkeleton}
          style={{
            marginBottom: 50,
          }}
        >
          <Avatar />
        </Skeleton>
        <Skeleton
          className={classes.centerSkeleton}
          variant="text"
          width={"80%"}
        >
          <Typography>.</Typography>
        </Skeleton>
        <Skeleton
          className={classes.centerSkeleton}
          variant="text"
          width={"80%"}
        >
          <Typography>.</Typography>
        </Skeleton>
      </Grid>
    </Grid>
  )))

  return  (
    <>
      <Spinner loading={loading} />
      <Menu search={true} type={type} parameter={q}/>
      {/* <Container style={{paddingTop: 20}} maxWidth="md"> */}
        <Grid container>
          <Grid item xs={3} style={{padding: 20}}>
            <Filter />
          </Grid>
          <Grid item xs={9} container style={{padding: 20}}>
            <Grid item style={{ maxHeight: 80 }}>
              <Typography className={classes.titleSearch} variant="h6" component="h6">
                Resultado de busca para "{q}"
              </Typography>
              <Typography color="textSecondary" variant="body2" paragraph>
                Exibindo 1 - 8 de {results.length} resultados
              </Typography>
            </Grid>
            {results.length>0 &&
            <Grid item container justify="flex-end" style={{ marginBottom: 16 }}>
              <Typography>Página: {pagination.page}</Typography>
              <Pagination color="secondary" variant="outlined"  count={Math.ceil(results.length/8)} page={pagination.page} onChange={handleChangePage} />
            </Grid>
            }
            <br />
            <Grid item container spacing={3} justify="center">
              {skeleton}
              {resultsPagination.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <CardProduct item={item}/>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      {/* </Container> */}
    </>
  )
}