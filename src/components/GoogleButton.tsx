import { useRef, useEffect } from 'react'

export function GoogleButton({ width }: { width: string }) {
  debugger

  const renderButton = (parent: HTMLDivElement) => {
    const { google } = window
    if (google) {
      google.accounts.id.renderButton(parent, {
        type: 'standard',
        shape: 'pill',
        theme: 'outline',
        text: 'continue_with',
        size: 'large',
        width: width,
        locale: 'en_us',
        logo_alignment: 'left',
      })
    }
  }

  return <div ref={renderButton}></div>
}
