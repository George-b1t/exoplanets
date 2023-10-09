import axios from 'axios'

export const apiPlanet = axios.create({
  baseURL: 'http://20.195.201.157:8080',
})

export const apiImages = axios.create({
  baseURL: 'http://20.195.201.157:5000',
})
