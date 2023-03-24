import { Divider, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'
import { AddCodeForm } from '../../../../types/general'
import PlaceField from '../../PlaceField'
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
        value={form.giverFN}
        onInput={(e) =>
          setForm((draft) => {
            draft.giverFN = (e.target as HTMLInputElement).value
          })
        }
      />
      <PlaceField
        setCity={(city) =>
          setForm((draft) => {
            draft.giverCity = city
          })
        }
        setState={(state) =>
          setForm((draft) => {
            draft.giverState = state
          })
        }
        setCoords={(coords) =>
          setForm((draft) => {
            draft.giverCoords = coords
          })
        }
      />
      <Divider />
      <Typography
        textAlign='center'
        color='primary.dark'
        fontSize={18}
      >
        Who are you giving to?
      </Typography>
      <TextField
        InputProps={{ className: 'rounded-full' }}
        size='small'
        label='First Name'
        type='text'
        autoComplete='off'
        value={form.recipFN}
        onInput={(e) =>
          setForm((draft) => {
            draft.recipFN = (e.target as HTMLInputElement).value
          })
        }
      />
      <PlaceField
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
        setCoords={(coords) =>
          setForm((draft) => {
            draft.recipCoords = coords
          })
        }
      />
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

function validate(form: AddCodeForm) {
  if (!form.giverFN) {
    return 'Missing Your First Name'
  }
  if (!form.recipFN) {
    return 'Missing Recipient First Name'
  }
  return ''
}
