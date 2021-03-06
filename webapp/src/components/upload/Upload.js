import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { connect } from 'react-redux'
import CSVReader from 'react-csv-reader'
import { css } from '@emotion/core'
import { v4 as uuidv4 } from 'uuid'
import { ADD_TRANSACTION, GET_ALL_TRANSACTIONS } from '../../queries/queries'
import { validateUploadData } from '../../helpers/helpers'

const Upload = ({ userId, darkMode, history }) => {
  const [uploadedTransactions, setUploadedTransactions] = useState([])
  const [dataError, setDataError] = useState(false)
  const [addTransaction] = useMutation(ADD_TRANSACTION)
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, '_')
  }

  useEffect(() => {
    if (!userId) {
      history.push('/')
    }
  }, [])

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
          transaction_id: uuidv4(),
          user_id: userId
        },
        refetchQueries: [{ query: GET_ALL_TRANSACTIONS }]
      })
    })
  }, [uploadedTransactions])

  const uploadData = data => {
    const valid = validateUploadData(data)

    if (!valid) {
      return setDataError(true)
    }

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
            <p>View them below, navigate back <Link to='/home'>home</Link> or upload more</p>
            <div css={previewFlex}>
              {uploadedTransactions.map(transaction => (
                <div css={darkMode ? [previewStyles, darkModeStyles] : previewStyles} key={uuidv4()}>
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
      {dataError
        ? <p>There was an error uploading your data due to missing fields.</p>
        : null}
    </section>
  )
}

Upload.propTypes = {
  userId: PropTypes.string,
  darkMode: PropTypes.bool,
  history: PropTypes.object
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

const darkModeStyles = css`
  background: #1c2541;
`

const mapStateToProps = reduxState => {
  return {
    userId: reduxState.user.user_id,
    darkMode: reduxState.user.darkMode
  }
}

export default connect(mapStateToProps)(Upload)
