import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
   return axios.get(baseUrl)
}

const create = (objekti) => axios.post(baseUrl, objekti)

const update = (objekti,id) => axios.put(`${baseUrl}/${id}`,objekti)

const deleteUser = (id) => axios.delete(`${baseUrl}/${id}`)

export default {getAll, create, deleteUser, update}