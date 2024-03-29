import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { useEffect } from 'react'
import { AddCodeForm, ApiRes } from '../../../../types/general'
import fetchItem from '../../../services/fetchItem'
import AddCodeContentWrapper from '../AddCodeContentWrapper'
import { useForm } from '../AddCodeModal'
import axios from 'axios'

export default function AddCodeStep({
  isGiving,
  handleGiving,
}: {
  isGiving: boolean
  handleGiving: (val: string) => void
}) {
  const title = 'Enter Tracking Code'
  const { form, setForm, setValidationFn } = useForm()
  useEffect(() => setValidationFn(() => validate), [setValidationFn])

  return (
    <AddCodeContentWrapper title={title}>
      <MuiOtpInput
        value={form.code}
        length={6}
        gap='2px'
        onChange={(value) =>
          setForm((draft) => {
            draft.code = value.toUpperCase()
          })
        }
        TextFieldsProps={{ autoComplete: 'off' }}
      />
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

async function validate(form: AddCodeForm) {
  if (!form.code) {
    return 'Missing Code'
  }
  if (form.code.length != 6) {
    return 'Code Must Be 6 Characters'
  }

  const check = await fetchItem(form.code)
  if (check.error) {
    return check.error
  }
  if (!check.data) {
    const res = await axios
      .post<ApiRes<void>>('/api/item/create', {
        code: form.code,
      })
      .then((r) => r.data)
    if (res.error) {
      return res.error
    }
  }

  return ''
}
