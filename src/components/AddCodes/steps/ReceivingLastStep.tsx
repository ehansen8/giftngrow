import { TextField } from '@mui/material'
import AddCodeContentWrapper from '../AddCodeContentWrapper'
import { useForm } from '../AddCodeModal'

export default function ReceivingLastStep() {
  const title = 'Write a comment for others to see!'
  const { form, setForm } = useForm()
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
