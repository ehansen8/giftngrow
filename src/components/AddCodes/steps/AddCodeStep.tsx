import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { Updater } from 'use-immer'
import { AddCodeForm } from '../../../../types/general'
import AddCodeContentWrapper from '../AddCodeContentWrapper'

export default function AddCodeStep({
  form,
  setForm,
  isGiving,
  handleGiving,
}: {
  form: AddCodeForm
  setForm: Updater<AddCodeForm>
  isGiving: boolean
  handleGiving: (val: string) => void
}) {
  const title = 'Start Tracking!'
  return (
    <AddCodeContentWrapper title={title}>
      <TextField
        InputProps={{ className: 'rounded-full' }}
        size='small'
        label='Tracking Code'
        type='text'
        autoComplete='off'
        value={form.bagId}
        onInput={(e) =>
          setForm((draft) => {
            draft.bagId = (e.target as HTMLInputElement).value
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
