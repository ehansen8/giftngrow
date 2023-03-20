import styled from '@emotion/styled'
import { Button, SxProps } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { colors } from '../colors'
import logo from '../../public/gng_logo.png'
import logo_svg from '../../public/gng_logo.svg'

const links = [
  {
    label: 'About',
    url: 'https://giftngrow.square.site/about',
  },
  {
    label: 'Conditions of Use',
    url: 'https://giftngrow.square.site/terms-of-use',
  },
  {
    label: 'Privacy Policy',
    url: 'https://giftngrow.square.site/privacy-policy',
  },
  {
    label: 'Contact Us',
    url: 'https://giftngrow.square.site/contact-us',
  },
]

const buttonStyle: SxProps = {
  fontSize: '12px',
  color: 'black',
  ':hover': { color: 'white' },
}

export default function Footer() {
  return (
    <footer
      className='flex flex-row gap-3 flex-wrap pt-2 justify-around items-center'
      style={{ maxWidth: '1000px', margin: 'auto' }}
    >
      <div className='flex  items-center gap-2 justify-center'>
        <a
          href='https://giftngrow.square.site/'
          target='_blank'
        >
          <Image
            className=''
            src={logo_svg}
            alt="Gift 'n Grow"
            height={90}
          />
        </a>
        <div className='flex flex-col text-center text-black'>
          <h3 className='m-0'>Gift 'n Grow</h3>
          <p className='mt-2'>Delafield, WI</p>
        </div>
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
              className='text-center'
              target='_blank'
            >
              {link.label}
            </Button>
          ))}
        </div>
        <p className='text-black'>
          Copyright © 2010 Gift 'n Grow. All rights reserved.
        </p>
      </div>
      <Image
        className='Gbsoa'
        src='/GreenBusinessSealofApprovalTiny.png'
        alt='Green Business Seal of Approval'
        width={66}
        height={74}
      />
    </footer>
  )
}
