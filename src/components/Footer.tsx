import styled from '@emotion/styled'
import { Button, SxProps } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { colors } from '../pages/_app'

const links = [
  {
    label: 'About Us',
    url: '/about',
  },
  {
    label: 'Terms and Conditions',
    url: '/terms',
  },
  {
    label: 'Privacy Policy',
    url: '/privacy',
  },
  {
    label: 'Contact Us',
    url: '/contact',
  },
]

const buttonStyle: SxProps = {
  fontSize: '12px',
  color: colors.greenLightGreen,
  ':hover': { color: 'white' },
}

export default function Footer() {
  return (
    <footer
      className='flex flex-row justify-between mx-3'
      style={{ maxWidth: '1000px', margin: 'auto' }}
    >
      <div className='flex mt-4 items-center gap-2'>
        <Image
          className='-mt-6'
          src='/logo_footer.png'
          alt="Gift 'n Grow"
          width={84}
          height={105}
        />
        <div className='flex flex-col'>
          <h3 className='m-0'>Gift 'n Grow</h3>
          <p className='mt-2'>
            P.O. Box 180553
            <br />
            Delafield, WI 53018
            <br />
            terri@giftngrow.com
          </p>
        </div>
        <Image
          className='Gbsoa'
          src='/GreenBusinessSealofApprovalTiny.png'
          alt='Green Business Seal of Approval'
          width={66}
          height={74}
        />
      </div>
      <div className='flex flex-col items-center self-center'>
        <div className='flex gap-1'>
          {links.map((link) => (
            <Button
              key={link.url}
              href={link.url}
              variant='text'
              size='small'
              LinkComponent={Link}
              sx={buttonStyle}
            >
              {link.label}
            </Button>
          ))}
        </div>
        <p>Copyright © 2010 Gift ‘n Grow. All rights reserved.</p>
      </div>
    </footer>
  )
}
