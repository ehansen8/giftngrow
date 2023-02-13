import { TextField, Typography } from '@mui/material'
import { AddCodeForm } from '../../../../types/general'
import AddCodeContentWrapper from '../AddCodeContentWrapper'
import { useForm } from '../AddCodeModal'

export default function GivingUserStep() {
  const title = 'About Yourself'
  const { form, setForm, setValidationFn } = useForm()
  setValidationFn(() => validate)
  return (
    <AddCodeContentWrapper title={title}>
      <TextField
        InputProps={{ className: 'rounded-full' }}
        size='small'
        label='First Name'
        type='text'
        autoComplete='given-name'
        value={form.giverFN}
        onInput={(e) =>
          setForm((draft) => {
            draft.giverFN = (e.target as HTMLInputElement).value
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
          value={form.giverCity}
          onInput={(e) =>
            setForm((draft) => {
              draft.giverCity = (e.target as HTMLInputElement).value
            })
          }
        />
        <TextField
          InputProps={{ className: 'rounded-full' }}
          size='small'
          label='State'
          type='text'
          autoComplete='address-level1'
          value={form.giverState}
          onInput={(e) =>
            setForm((draft) => {
              draft.giverState = (e.target as HTMLInputElement).value
            })
          }
        />
      </div>
    </AddCodeContentWrapper>
  )
}

function validate(form: AddCodeForm) {
  if (!form.giverFN) {
    return 'Missing First Name'
  }
  return ''
}
