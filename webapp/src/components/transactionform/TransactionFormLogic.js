export const selectPaymentType = (type, debit, credit, cb1, cb2) => {
  if (type === 'debit') {
    cb1(true)
    if (credit) {
      cb2(false)
    }
  } else if (type === 'credit') {
    cb2(true)
    if (debit) {
      cb1(false)
    }
  }
}
