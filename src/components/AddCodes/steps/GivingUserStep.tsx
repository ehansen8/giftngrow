import { TextField } from '@mui/material'
import { Updater } from 'use-immer'
import { AddCodeForm } from '../../../../types/general'
import AddCodeContentWrapper from '../AddCodeContentWrapper'

export default function GivingUserStep({
  form,
  setForm,
}: {
  form: AddCodeForm
  setForm: Updater<AddCodeForm>
}) {
  const title = 'About Yourself'
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
