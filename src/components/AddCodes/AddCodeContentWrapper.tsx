import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { colors } from '../../colors'
import { ReactNode } from 'react'
import { useForm } from './AddCodeModal'
import { Typography } from '@mui/material'

export default function AddCodeContentWrapper({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  const { error } = useForm()
  return (
    <>
      <DialogTitle
        color='white'
        textAlign='center'
        sx={{ backgroundColor: colors.green }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        className='flex flex-col gap-3 !pt-3 m-auto'
        sx={{ width: '250px' }}
      >
        <Typography
          color='error'
          fontSize={12}
          textAlign='center'
        >
          {error}
        </Typography>
        {children}
      </DialogContent>
    </>
  )
}
