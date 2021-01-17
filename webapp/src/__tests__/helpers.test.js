import { validateUploadData } from '../helpers/helpers'

describe('validateUploadData tests', () => {
    it('validateUploadData returns false when passed no data', () => {
        expect(validateUploadData()).toEqual(false)
    })

    it('validateUploadData returns true when passed correct data', () => {
        const data = [{
            amount: 50,
            description: 'Computers',
            category: 'Engineering',
            debit: true,
            credit: false,
            merchant_id: '10'
        }]

        expect(validateUploadData(data)).toEqual(true)
    })
})
