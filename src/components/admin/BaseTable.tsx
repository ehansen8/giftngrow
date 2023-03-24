import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import { Model } from '../../lib/entities/abcModel'

export function BaseTable<T extends Model>({
  headers,
  data,
}: {
  headers: { display: string; index: string }[]
  data: T[]
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{ width: 'max-content', maxWidth: '100%' }}
      className='m-auto'
    >
      <Table sx={{ width: 'max-content' }}>
        <TableHead>
          <TableRow>
            {headers.map(({ display }, idx) => (
              <TableCell key={idx}>{display}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, idx) => (
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
