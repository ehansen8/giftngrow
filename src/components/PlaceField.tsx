import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import parse from 'autosuggest-highlight/parse'
import { debounce } from '@mui/material/utils'
import { useEffect, useMemo, useState } from 'react'
import { Coords } from '../../types/general'
import { geocode } from '../utils/geocode'

type service = { current: null | google.maps.places.AutocompleteService }
const autocompleteService: service = { current: null }

interface MainTextMatchedSubstrings {
  offset: number
  length: number
}
interface StructuredFormatting {
  main_text: string
  secondary_text: string
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[]
}
interface PlaceType {
  place_id: string
  description: string
  terms: { value: string }[]
  structured_formatting: StructuredFormatting
}

export default function PlaceField({
  setCity,
  setState,
  setCoords,
}: {
  setCity: (city: string) => void
  setState: (state: string) => void
  setCoords: (coords: Coords) => void
}) {
  const [value, setValue] = useState<PlaceType | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<readonly PlaceType[]>([])
  const [placeId, setPlaceId] = useState<string>('')

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: google.maps.places.AutocompletionRequest,
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          if (autocompleteService.current) {
            //@ts-ignore
            autocompleteService.current.getPlacePredictions(request, callback)
          }
        },
        400,
      ),
    [],
  )

  useEffect(() => {
    let active = true

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    const autocompleteOptions: Partial<google.maps.places.AutocompletionRequest> =
      {
        componentRestrictions: { country: ['us'] },
        types: ['(cities)'],
      }
    fetch(
      { ...autocompleteOptions, input: inputValue },
      (results?: readonly PlaceType[]) => {
        if (active) {
          let newOptions: readonly PlaceType[] = []

          if (value) {
            newOptions = [value]
          }

          if (results) {
            newOptions = [...newOptions, ...results]
          }

          setOptions(newOptions)
        }
      },
    )

    return () => {
      active = false
    }
  }, [value, inputValue, fetch])

  async function handleChange(event: any, newValue: PlaceType | null) {
    setOptions(newValue ? [newValue, ...options] : options)
    setValue(newValue)
    setCity(newValue?.terms[0].value ?? '')
    setState(newValue?.terms[1].value ?? '')
    const placeId = newValue?.place_id ?? ''
    setPlaceId(placeId)
    setCoords(await geocode({ placeId }))
  }

  return (
    <Autocomplete
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText='No locations'
      onChange={handleChange}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          className='google-autocomplete-field'
          label='City, State'
          size='small'
        />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || []

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ]),
        )

        return (
          <li {...props}>
            <Grid
              container
              alignItems='center'
            >
              <Grid
                item
                sx={{ display: 'flex', width: 44 }}
              >
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid
                item
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component='span'
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography
                  variant='body2'
                  color='text.secondary'
                >
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}
