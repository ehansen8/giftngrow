import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { AddCodeForm } from '../../../../types/general'
import AddCodeContentWrapper from '../AddCodeContentWrapper'
import { useForm } from '../AddCodeModal'

export default function AddCodeStep({
  isGiving,
  handleGiving,
}: {
  isGiving: boolean
  handleGiving: (val: string) => void
}) {
  const title = 'Start Tracking!'
  const { form, setForm, setValidationFn } = useForm()
  setValidationFn(() => validate)
  return (
    <AddCodeContentWrapper title={title}>
      <TextField
        InputProps={{ className: 'rounded-full' }}
        size='small'
        label='Tracking Code'
        type='text'
        autoComplete='off'
        value={form.code}
        onInput={(e) =>
          setForm((draft) => {
            draft.code = (e.target as HTMLInputElement).value.toUpperCase()
          })
        }
      ></TextField>
      <FormControl className=''>
        <RadioGroup
          className='m-auto'
          row
          aria-labelledby='demo-row-radio-buttons-group-label'
          name='row-radio-buttons-group'
          value={isGiving}
          onChange={(e) => handleGiving(e.target.value)}
        >
          <FormControlLabel
            value={true}
            control={<Radio />}
            label='Giving'
          />
          <FormControlLabel
            value={false}
            control={<Radio />}
            label='Receiving'
          />
        </RadioGroup>
      </FormControl>
    </AddCodeContentWrapper>
  )
}

function validate(form: AddCodeForm) {
  if (!form.code) {
    return 'Missing Code'
  }
  if (form.code.length != 6) {
    return 'Code Must Be 6 Characters'
  }
  return ''
}
