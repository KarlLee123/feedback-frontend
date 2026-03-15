import axios from 'axios'

export function analyzeFeedback(content) {
  return axios.post('http://localhost:8080/api/analyze', {
    content: content
  })
}

export function getRecordList() {
  return axios.get('http://localhost:8080/api/records')
}

export function getRecordDetail(id) {
  return axios.get(`http://localhost:8080/api/records/${id}`)
}

export function deleteRecord(id) {
  return axios.delete(`http://localhost:8080/api/records/${id}`)
}