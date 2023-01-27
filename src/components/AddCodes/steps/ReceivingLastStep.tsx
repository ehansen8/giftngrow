import { TextField } from '@mui/material'
import { Updater } from 'use-immer'
import { AddCodeForm } from '../../../../types/general'
import AddCodeContentWrapper from '../AddCodeContentWrapper'

export default function ReceivingLastStep({
  form,
  setForm,
}: {
  form: AddCodeForm
  setForm: Updater<AddCodeForm>
}) {
  const title = 'Write a comment for others to see!'
  return (
    <AddCodeContentWrapper title={title}>
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
