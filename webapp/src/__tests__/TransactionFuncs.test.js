import { selectPaymentType } from '../components/transactionform/TransactionFormLogic'

it('selectPaymentType correctly switches from debit to credit', () => {
  let debit = false
  let credit = true

  const callbackOne = (bool) => {
    debit = bool
  }

  const callbackTwo = (bool) => {
    credit = bool
  }

  selectPaymentType('debit', debit, credit, callbackOne, callbackTwo)
  expect(debit).toBeTruthy()
})

it('selectPaymentType correctly switches from credit to debit', () => {
    let debit = true
    let credit = false
  
    const callbackOne = (bool) => {
      debit = bool
    }
  
    const callbackTwo = (bool) => {
      credit = bool
    }
  
    selectPaymentType('credit', debit, credit, callbackOne, callbackTwo)
    expect(credit).toBeTruthy()
  })