import { Container, Typography, Grid } from "@material-ui/core";
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react";
import { get, post } from '../services/api';
import { get as get_images, post as post_images} from '../services/api_images';
import Card from '../components/Card.js'

export default function Busca() {
  const router = useRouter();

  const [results, setResults] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const images = []

  const {
      query: { q },
   } = router

  let data = {
    descricao: '',
    dias: 3,
    latitude: -9.6432331,
    longitude: -35.7190686,
    raio: 15
  }
  
 useEffect(async () => {
    data.descricao =  q
    const request = async () => {
      const retorno =  await post('consultarPrecosPorDescricao', data)
      if (retorno.status === 200) {
        const produtos = retorno.data.slice(0,4);

        for(let produto of produtos) {
          produto.link = await getImage(produto.dscProduto, produto.codGetin)
        }

        setResults(produtos) 
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

  useEffect(() => {
    for (const result of results) {
      getImage(result.dscProduto, result.codGetin)
    }
    console.log(images, results)
    setOpen(true)
  }, [results]);

  return  (
    <Container>
      <Typography paragraph variant="h6" component="h6">
          Exibindo resultados para busca de "{q}"
      </Typography>
      <Grid container spacing={2} alignItems="center" justify="center">
        {results.map((item, index) => (
          <Grid item xs={4}>
            <Card item={item}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}