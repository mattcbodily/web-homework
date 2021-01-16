import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import CSVReader from 'react-csv-reader'
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
    <section>
      <h2>Upload CSV</h2>
      <p>Upload and add transactions through a CSV file below</p>
      <CSVReader
        onFileLoaded={uploadData}
        parserOptions={papaparseOptions} />
      {uploadedTransactions && uploadedTransactions.map(transaction => (
        <div key={uuidv4()}>${transaction.amount} {transaction.description} {transaction.category}</div>
      ))}
    </section>
  )
}

export default Upload
