import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import CSVReader from 'react-csv-reader'
import { css } from '@emotion/core'
import { v4 as uuidv4 } from 'uuid'
import { ADD_TRANSACTION, GET_ALL_TRANSACTIONS } from '../../queries/queries'

const Upload = () => {
  const [uploadedTransactions, setUploadedTransactions] = useState([])
  const [addTransaction] = useMutation(ADD_TRANSACTION)
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, '_')
  }

  useEffect(() => {
    uploadedTransactions && uploadedTransactions.map(transaction => {
      const date = new Date()
      const dateOfUpload = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`

      addTransaction({
        variables: {
          amount: parseFloat(transaction.amount),
          description: transaction.description,
          category: transaction.category,
          debit: transaction.debit,
          credit: transaction.credit,
          merchant_id: transaction.merchant_id.toString(),
          spendDate: dateOfUpload,
          transaction_id: uuidv4()
        },
        refetchQueries: [{ query: GET_ALL_TRANSACTIONS }]
      })
    })
  }, [uploadedTransactions])

  const uploadData = data => {
    setUploadedTransactions(data)
  }

  return (
    <section css={uploadStyles}>
      <h2>Upload CSV</h2>
      <p>Upload your transactions through a CSV file</p>
      <CSVReader
        onFileLoaded={uploadData}
        parserOptions={papaparseOptions} />
      {uploadedTransactions.length > 0
        ? (
          <section>
            <h3>Transactions Uploaded Successfully!</h3>
            <p>View them below, navigate back <Link to='/'>home</Link> or upload more</p>
            <div css={previewFlex}>
              {uploadedTransactions.map(transaction => (
                <div css={previewStyles} key={uuidv4()}>
                  <p>Amount: ${transaction.amount}</p>
                  <p>Payment Method: {transaction.debit ? 'Debit' : 'Credit'}</p>
                  <p>Description: {transaction.description}</p>
                  <p>Category: {transaction.category}</p>
                </div>
              ))}
            </div>
          </section>
        )
        : null
      }
    </section>
  )
}

const uploadStyles = css`
  box-sizing: border-box;
  min-height: 100vh;
  padding: 120px;

  h2 {
    font-size: 30px;
    margin: 10px 0;
  }

  p {
    font-size: 18px;
    margin: 10px 0;
  }
`

const previewFlex = css`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`

const previewStyles = css`
  box-sizing: border-box;
  height: 170px;
  width: 250px;
  margin: 0 15px 15px 0;
  padding: 10px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 2px 1px gray;
`

export default Upload
