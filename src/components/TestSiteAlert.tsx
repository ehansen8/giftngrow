import { Alert, Typography } from '@mui/material'

export default function TestSiteAlert() {
  if (process.env.NEXT_PUBLIC_BRANCH !== 'prod') {
    return (
      <Alert
        severity='warning'
        variant='filled'
        className='mt-0 -mb-2'
        sx={{
          '& .MuiAlert-message': {
            width: '100%',
            textAlign: 'center',
          },
        }}
      >
        <Typography fontSize={20}>
          This is a Test Site, codes and data are for testing purposes only
        </Typography>
      </Alert>
    )
  }

  return <></>
}
