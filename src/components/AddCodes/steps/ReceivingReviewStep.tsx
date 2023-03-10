import { Divider, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'
import { AddCodeForm } from '../../../../types/general'
import GooglePlacesAutocomplete from '../../PlaceField'
import AddCodeContentWrapper from '../AddCodeContentWrapper'
import { useForm } from '../AddCodeModal'

export default function GivingReview() {
  const title = 'Entry Details'
  const { form, setForm, setValidationFn } = useForm()
  useEffect(() => setValidationFn(() => validate), [setValidationFn])

  return (
    <AddCodeContentWrapper title={title}>
      <Typography
        textAlign='center'
        color='primary.dark'
        fontSize={18}
      >
        About yourself
      </Typography>
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
      <GooglePlacesAutocomplete
        setCity={(city) =>
          setForm((draft) => {
            draft.recipCity = city
          })
        }
        setState={(state) =>
          setForm((draft) => {
            draft.recipState = state
          })
        }
      />
      <Divider />
      <Typography
        textAlign='center'
        color='primary.dark'
        fontSize={18}
      >
        Write a comment for others to see!
      </Typography>
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

function validate(form: AddCodeForm) {
  if (!form.giverFN) {
    return 'Missing First Name'
  }
  return ''
}
