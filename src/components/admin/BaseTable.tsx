import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
} from '@mui/material'
import { Model } from '../../lib/entities/abcModel'
import { useState } from 'react'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

export function BaseTable<T extends Model>({
  headers,
  data,
}: {
  headers: { display: string; index: string }[]
  data: { [key: string]: any }[]
}) {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState('regDate')
  const [sortedData, setSortedData] = useState(data)

  function handleSort(property: string) {
    const isAscending = orderBy === property && order === 'asc'
    const toggledOrder = isAscending ? 'desc' : 'asc'
    setOrder(toggledOrder)
    setOrderBy(property)
    const sorted = stableSort(data, getComparator(toggledOrder, property))
    setSortedData(sorted)
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ width: 'max-content', maxWidth: '100%' }}
      className='m-auto'
    >
      <Table sx={{ width: 'max-content' }}>
        <TableHead>
          <TableRow>
            {headers.map(({ display, index }) => (
              <TableCell key={index}>
                <TableSortLabel
                  active={orderBy === index}
                  direction={orderBy === index ? order : 'asc'}
                  onClick={() => handleSort(index)}
                >
                  {display}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row, idx) => (
            <TableRow key={idx}>
              {headers.map(({ index }) => {
                let value = (row as any)[index]

                //Handles Case where values can be objects such as coordinates
                if (typeof value !== 'string') {
                  value = JSON.stringify(value)
                }
                return <TableCell key={index}>{value}</TableCell>
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
