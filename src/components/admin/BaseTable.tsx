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
            {headers.map(({ display }) => (
              <TableCell>{display}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow>
              {headers.map(({ index }) => (
                <TableCell>{(row as any)[index]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
