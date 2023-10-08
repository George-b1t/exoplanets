import axios from 'axios'

export const apiPlanet = axios.create({
  baseURL: 'http://192.168.52.35:8080',
})

export const apiImages = axios.create({
  baseURL: 'http://192.168.52.32:5000',
})
