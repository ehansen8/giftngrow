import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useState, createContext, useContext } from 'react'
import { Updater, useImmer } from 'use-immer'
import { AddCodeForm } from '../../../types/general'
import AddCodeStep from './steps/AddCodeStep'
import GivingUserStep from './steps/GivingUserStep'
import ReceivingUserStep from './steps/ReceivingUserStep'
import GivingLastStep from './steps/GivingLastStep'
import ReceivingLastStep from './steps/ReceivingLastStep'
import { createEntry } from '../../services/createEntry'

type ContextType = {
  form: AddCodeForm
  setForm: Updater<AddCodeForm>
  error: string
  setValidationFn: Updater<(form: AddCodeForm) => string>
}

const FormContext = createContext<ContextType | null>(null)

export function useForm() {
  return useContext(FormContext)!
}

export default function AddCodeModal({
  open,
  setOpen,
  onAdd,
}: {
  open: boolean
  setOpen: (isOpen: boolean) => void
  onAdd: () => void
}) {
  const [form, setForm] = useImmer(defaultForm)
  const [error, setError] = useImmer('')
  const [validationFn, setValidationFn] = useImmer<
    (form: AddCodeForm) => string
  >(() => () => {
    return 'hi'
  })
  const [step, setStep] = useState(0)
  const maxSteps = 2

  function validateForm() {
    const err = validationFn(form)
    setError(err)
    return err === ''
  }

  function handleClose() {
    setStep(0)
    setForm(defaultForm)
    setOpen(false)
  }

  function handleStep() {
    if (validateForm()) {
      setStep((s) => s + 1)
    }
  }

  async function handleSubmit() {
    if (validateForm()) {
      const { ok, error, data } = await createEntry(form)
      if (ok) {
        handleClose()
        onAdd()
      } else {
        setError(error)
      }
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={false}
      maxWidth='sm'
      PaperProps={{ className: 'rounded-xl' }}
    >
      <FormContext.Provider value={{ form, setForm, error, setValidationFn }}>
        <FormStepper step={step} />
      </FormContext.Provider>
      <DialogActions className='m-auto'>
        {step > 0 && (
          <Button
            color='secondary'
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </Button>
        )}
        {step < maxSteps && <Button onClick={handleStep}>Next</Button>}
        {step == maxSteps && (
          <Button
            onClick={handleSubmit}
            variant='contained'
          >
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

const defaultForm: AddCodeForm = {
  code: '',
  giverFN: '',
  giverCity: '',
  giverState: '',
  recipFN: '',
  recipCity: '',
  recipState: '',
  occasion: '',
  gift: '',
  comment: '',
}

function FormStepper({ step }: { step: number }) {
  const [isGiving, setIsGiving] = useState(true)
  const { form, setForm } = useForm()
  function handleIsGiving(val: string) {
    //reset form on switch except code
    setIsGiving(val === 'true')
    setForm({ ...defaultForm, code: form.code })
  }

  if (step == 0) {
    return (
      <AddCodeStep
        isGiving={isGiving}
        handleGiving={handleIsGiving}
      />
    )
  }
  if (step == 1 && isGiving) {
    return <GivingUserStep />
  }
  if (step == 1 && !isGiving) {
    return <ReceivingUserStep />
  }
  if (step == 2 && isGiving) {
    return <GivingLastStep />
  }
  if (step == 2 && !isGiving) {
    return <ReceivingLastStep />
  }
  return <div></div>
}
