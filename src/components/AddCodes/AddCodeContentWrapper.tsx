import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { colors } from '../../colors'
import { ReactNode } from 'react'

export default function AddCodeContentWrapper({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
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
        {children}
      </DialogContent>
    </>
  )
}
