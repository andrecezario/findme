import Axios from "axios";
import { error, response } from "./treatment";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_SEFAZ,
  headers: {
    AppToken: process.env.REACT_APP_TOKEN,
  },
});

const get = async (endpoint, config = {}) => {
    return await axios.get(endpoint, config)
    .then(res => (response(res)))
    .catch(err => error(err))
  };
  
  const post = async (endpoint, data, config = {}) => {
    return await axios.post(endpoint, data, config)
      .then(res => (response(res)))
      .catch(err => error(err))
  };
  
export { axios, get, post };