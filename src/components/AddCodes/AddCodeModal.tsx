import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useImmer } from 'use-immer'
import { AddCodeForm } from '../../../types/general'
import AddCodeStep from './steps/AddCodeStep'
import GivingUserStep from './steps/GivingUserStep'
import ReceivingUserStep from './steps/ReceivingUserStep'
import GivingLastStep from './steps/GivingLastStep'
import ReceivingLastStep from './steps/ReceivingLastStep'

export default function AddCodeModal({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (isOpen: boolean) => void
}) {
  const [step, setStep] = useState(0)
  const maxSteps = 2

  return (
    <Dialog
      open={open}
      onClose={() => {
        setStep(0)
        setOpen(false)
      }}
      fullWidth={false}
      maxWidth='sm'
      PaperProps={{ className: 'rounded-xl' }}
    >
      <FormStepper step={step} />
      <DialogActions className='m-auto'>
        {step > 0 && (
          <Button
            color='secondary'
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </Button>
        )}
        {step < maxSteps && (
          <Button onClick={() => setStep((s) => s + 1)}>Next</Button>
        )}
        {step == maxSteps && <Button variant='contained'>Confirm</Button>}
      </DialogActions>
    </Dialog>
  )
}

const defaultForm: AddCodeForm = {
  bagId: '',
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
  const [form, setForm] = useImmer(defaultForm)
  const [isGiving, setIsGiving] = useState(true)

  function handleIsGiving(val: string) {
    //reset form on switch except code
    setIsGiving(val === 'true')
    setForm({ ...defaultForm, bagId: form.bagId })
  }

  if (step == 0) {
    return (
      <AddCodeStep
        form={form}
        setForm={setForm}
        isGiving={isGiving}
        handleGiving={handleIsGiving}
      />
    )
  }
  if (step == 1 && isGiving) {
    return (
      <GivingUserStep
        form={form}
        setForm={setForm}
      />
    )
  }
  if (step == 1 && !isGiving) {
    return (
      <ReceivingUserStep
        form={form}
        setForm={setForm}
      />
    )
  }
  if (step == 2 && isGiving) {
    return (
      <GivingLastStep
        form={form}
        setForm={setForm}
      />
    )
  }
  if (step == 2 && !isGiving) {
    return (
      <ReceivingLastStep
        form={form}
        setForm={setForm}
      />
    )
  }
  return <div></div>
}
