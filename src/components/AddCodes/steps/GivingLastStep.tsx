import { TextField } from '@mui/material'
import { Updater } from 'use-immer'
import { AddCodeForm } from '../../../../types/general'
import AddCodeContentWrapper from '../AddCodeContentWrapper'

export default function GivingStep({
  form,
  setForm,
}: {
  form: AddCodeForm
  setForm: Updater<AddCodeForm>
}) {
  const title = 'Who are you giving to?'
  return (
    <AddCodeContentWrapper title={title}>
      <TextField
        InputProps={{ className: 'rounded-full' }}
        size='small'
        label='First Name'
        type='text'
        autoComplete='off'
        value={form.comment}
        onInput={(e) =>
          setForm((draft) => {
            draft.comment = (e.target as HTMLInputElement).value
          })
        }
      />
      <div className='flex flex-row gap-1'>
        <TextField
          InputProps={{ className: 'rounded-full' }}
          size='small'
          label='City'
          type='text'
          autoComplete='off'
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
          autoComplete='off'
          value={form.recipState}
          onInput={(e) =>
            setForm((draft) => {
              draft.recipState = (e.target as HTMLInputElement).value
            })
          }
        />
      </div>
      <TextField
        InputProps={{ className: 'rounded-full' }}
        size='small'
        label='Gift'
        type='text'
        autoComplete='off'
        value={form.gift}
        onInput={(e) =>
          setForm((draft) => {
            draft.gift = (e.target as HTMLInputElement).value
          })
        }
      />
      <TextField
        InputProps={{ className: 'rounded-full' }}
        size='small'
        label='Occasion'
        type='text'
        autoComplete='off'
        value={form.occasion}
        onInput={(e) =>
          setForm((draft) => {
            draft.occasion = (e.target as HTMLInputElement).value
          })
        }
      />

      <TextField
        InputProps={{ className: 'rounded-xl' }}
        multiline
        label='Comment'
        type='text'
        autoComplete='off'
        value={form.comment}
        onInput={(e) =>
          setForm((draft) => {
            draft.comment = (e.target as HTMLInputElement).value
          })
        }
      />
    </AddCodeContentWrapper>
  )
}
