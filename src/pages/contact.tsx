import { Button, Divider, Grid, TextField, Typography } from '@mui/material'

export default function Contact() {
  const style = { className: 'rounded-full' }
  return (
    <main className='p-4 rounded-md mt-4 bg-white'>
      <Typography
        variant='h4'
        textAlign='center'
      >
        Contact Us
      </Typography>
      <Divider
        variant='middle'
        className='mb-3'
      />
      <div
        className='flex flex-col gap-3 m-auto'
        style={{ width: '100%', maxWidth: '450px' }}
      >
        <Button
          target='_top'
          href='mailto:team@giftngrow.com'
          sx={{ textTransform: 'none' }}
        >
          team@giftngrow.com
        </Button>
        <Divider>or</Divider>
        <TextField
          InputProps={style}
          size='small'
          label='Name'
          type='text'
          autoComplete='name'
        />
        <TextField
          InputProps={style}
          size='small'
          label='Email'
          type='email'
          autoComplete='email'
        />
        <TextField
          InputProps={style}
          size='small'
          label='Subject'
          type='text'
          autoComplete='off'
        />
        <TextField
          InputProps={{ className: 'rounded-xl' }}
          className='mb-3'
          multiline
          label='Message'
          type='text'
          autoComplete='off'
        />
        <Button
          sx={{ width: '75%' }}
          className='rounded-full m-auto'
          variant='contained'
          type='submit'
        >
          Send Message
        </Button>
      </div>
    </main>
  )
}
