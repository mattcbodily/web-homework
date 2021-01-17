export function validateUploadData (data) {
  let valid = true

  if (!data) {
    valid = false
    return valid
  }

  data.forEach(el => {
    if (
      !el.amount ||
      !el.description ||
      !el.category ||
      el.debit === null ||
      el.credit === null ||
      !el.merchant_id
    ) {
      valid = false
      return valid
    }
  })

  return valid
}
