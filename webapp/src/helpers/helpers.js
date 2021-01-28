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

export function romanize (num) {
  if (num && num !== 0) {
    const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }
    let roman = ''
    let i
    for (i in lookup) {
      while (num >= lookup[i]) {
        roman += i
        num -= lookup[i]
      }
    }

    return roman
  } else if (num === 0 || num === '0.00') {
    return num
  }
}
