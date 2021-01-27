import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import { v4 as uuidv4 } from 'uuid'
import { REGISTER_USER, LOGIN_USER } from '../../queries/queries'
import { getUser } from '../../redux/userReducer'

const Register = ({ history, getUser, userId }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [registerUser, { data }] = useMutation(REGISTER_USER)

  const addUser = (e) => {
    e.preventDefault()

    if (firstName && lastName && email && password) {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        user_id: uuidv4(),
        romanNumeralSetting: false,
        darkMode: false
      }

      registerUser({
        variables: userData,
        refetchQueries: [{ query: LOGIN_USER, variables: { email, password } }]
      })
    }
  }

  useEffect(() => {
    if (userId) {
      history.push('/home')
    }
  }, [])

  useEffect(() => {
    if (data && data.registerUser) {
      getUser(data.registerUser)
      history.push('/home')
    }
  }, [data])

  return (
    <section css={registerStyles}>
      <form>
        <input onChange={e => setFirstName(e.target.value)} value={firstName} />
        <input onChange={e => setLastName(e.target.value)} value={lastName} />
        <input onChange={e => setEmail(e.target.value)} value={email} />
        <input onChange={e => setPassword(e.target.value)} type='password' value={password} />
        <button onClick={e => addUser(e)}>Register</button>
      </form>
    </section>
  )
}

Register.propTypes = {
  history: PropTypes.object,
  getUser: PropTypes.func,
  userId: PropTypes.string
}

const registerStyles = css`
  min-height: 100vh;
  padding-top: 120px;
`

const mapStateToProps = reduxState => {
  return {
    userId: reduxState.user.user_id
  }
}

export default connect(mapStateToProps, { getUser })(Register)
