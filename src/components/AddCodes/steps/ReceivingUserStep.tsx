import { TextField } from '@mui/material'
import { useEffect } from 'react'
import { AddCodeForm } from '../../../../types/general'
import AddCodeContentWrapper from '../AddCodeContentWrapper'
import { useForm } from '../AddCodeModal'

export default function ReceivingUserStep() {
  const title = 'About Yourself'
  const { form, setForm, setValidationFn } = useForm()
  useEffect(() => setValidationFn(() => validate), [])
  return (
    <AddCodeContentWrapper title={title}>
      <TextField
        InputProps={{ className: 'rounded-full' }}
        size='small'
        label='First Name'
        type='text'
        autoComplete='given-name'
        value={form.recipFN}
        onInput={(e) =>
          setForm((draft) => {
            draft.recipFN = (e.target as HTMLInputElement).value
          })
        }
      />
      <div className='flex flex-row gap-1'>
        <TextField
          InputProps={{ className: 'rounded-full' }}
          size='small'
          label='City'
          type='text'
          autoComplete='address-level2'
          value={form.recipCity}
          onInput={(e) =>
            setForm((draft) => {
              draft.recipCity = (e.target as HTMLInputElement).value
            })
          }
        />
        <TextField
          InputProps={{ className: 'rounded-full' }}
          size='small'
          label='State'
          type='text'
          autoComplete='address-level1'
          value={form.recipState}
          onInput={(e) =>
            setForm((draft) => {
              draft.recipState = (e.target as HTMLInputElement).value
            })
          }
        />
      </div>
    </AddCodeContentWrapper>
  )
}

function validate(form: AddCodeForm) {
  if (!form.recipFN) {
    return 'Missing First Name'
  }
  return ''
}
