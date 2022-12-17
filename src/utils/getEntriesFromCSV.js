import * as entries from '../../public/trackingCodes.csv'
import { TrackingCode } from '../lib/entities/trackingCode.entity'
const field_names = [
  'code', 'createdOn', 'user'
]


export default function getEntriesFromCSV() {
  return (entries.map(entry => {
    const e = new TrackingCode()
    field_names.forEach(field => {
      let value = entry[field]
      if (field == 'code') {
        value = `${entry[field]}`.padStart(6, '0')
      }
      if (field == 'createdOn') {
        value = new Date(entry[field]).getTime() / 1000
      }
      e[field] = value
    })
    return e
  }))
}