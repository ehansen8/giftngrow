import { useEffect, useRef } from 'react'

export function GoogleButton({ width }: { width: number }) {
  const parentRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const { google } = window
    if (parentRef.current === null) {
      return
    }
    if (google) {
      google.accounts.id.renderButton(parentRef.current, {
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
  }, [width])
  return <div ref={parentRef}></div>
}
