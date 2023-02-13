import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material'
import { useSession, getSession } from 'next-auth/react'
import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useEffect, useState } from 'react'
import { createBulkCodes } from '../services/createBulkCodes'
import { URL } from 'url'
import Link from 'next/link'

//TODO: add valid users to DB
// Also probably SSR this page

const validUsers = ['ehansen8@wisc.edu', 'evanjhans@gmail.com']
export default function Admin() {
  const { data: session, status } = useSession()
  const [value, setValue] = React.useState('entries')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const [code, getCode] = useGetCode()

  async function downloadCodes() {
    const data = await createBulkCodes(1)
  }

  if (status === 'loading') {
    return <main>Loading...</main>
  }

  if (!validUsers.includes(session?.user?.email as string)) {
    return <main>Access Denied</main>
  }
  return (
    <main className='p-4 rounded-md mt-4 flex flex-col items-center'>
      <h1 className='m-0'>Welcome to the Admin Page</h1>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label='lab API tabs example'
          >
            <Tab
              label='Entries'
              value='entries'
            />
            <Tab
              label='Users'
              value='users'
            />
            <Tab
              label='Get Codes'
              value='codes'
            />
          </TabList>
        </Box>
        <TabPanel value={'entries'}>
          <TestTable />
        </TabPanel>
        <TabPanel value={'users'}>
          <TestTable />
        </TabPanel>
        <TabPanel value={'codes'}>
          <Button onClick={downloadCodes}>Code: {code}</Button>
          <Button
            LinkComponent={Link}
            href='/api/getCodes'
          >
            Code: {code}
          </Button>
        </TabPanel>
      </TabContext>
    </main>
  )
}

function TestTable() {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label='simple table'
      >
        <TableHead>
          <TableRow>
            <TableCell>Dessert</TableCell>
            <TableCell>Calories</TableCell>
            <TableCell>Fat&nbsp;(g)</TableCell>
            <TableCell>Carbs&nbsp;(g)</TableCell>
            <TableCell>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell>Dessert</TableCell>
          <TableCell>Calories</TableCell>
          <TableCell>Fat&nbsp;(g)</TableCell>
          <TableCell>Carbs&nbsp;(g)</TableCell>
          <TableCell>Protein&nbsp;(g)</TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const gen = BigInt(13) ** BigInt(11)
const mod = BigInt(7) ** BigInt(19)
const possibleChars = '01GHJKLMNPQRSTVWXYZ'

function useGetCode(): [string, () => void] {
  const [previous, setPrevious] = useState(BigInt(333341833290882))
  const [code, setCode] = useState('')

  function getNextCode() {
    const next = (previous + gen) % mod
    let temp = next
    let output = ''
    for (let i = 0; i < 6; i++) {
      const index = temp % BigInt(19)
      output += possibleChars[Number(index)]
      temp = temp / BigInt(19)
    }
    setPrevious(next)
    setCode(output)
    console.log(next.toString(), output)
  }

  useEffect(() => getNextCode(), [])

  return [code, getNextCode]
}
