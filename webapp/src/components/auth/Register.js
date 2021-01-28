import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import { v4 as uuidv4 } from 'uuid'
import { REGISTER_USER, LOGIN_USER } from '../../queries/queries'
import { getUser } from '../../redux/userReducer'
import divvyLogo from '../../assets/divvy-logo-dark.png'

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
      <img alt='Divvy' src={divvyLogo} />
      <h1>Register to the Divvy Challenge</h1>
      <form css={formStyles}>
        <input onChange={e => setFirstName(e.target.value)} placeholder='First Name' value={firstName} />
        <input onChange={e => setLastName(e.target.value)} placeholder='Last Name' value={lastName} />
        <input onChange={e => setEmail(e.target.value)} placeholder='Email' value={email} />
        <input onChange={e => setPassword(e.target.value)} placeholder='Password' type='password' value={password} />
        <button onClick={e => addUser(e)}>Register</button>
      </form>
      <p>Have an account? <Link to='/'>Login here</Link></p>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    height: 100px;
  }

  h1 {
    margin: 15px;
  }

  input {
    box-sizing: border-box;
    height: 35px;
    width: 90%;
    margin-top: 10px;
    border-radius: 5px;
    outline: none;
    padding: 0 5px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 16px;
  }

  button {
    box-sizing: border-box;
    height: 35px;
    width: 90%;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid black;
    background: #159f6d;
    color: white;
    font-size: 16px;
    transition: 200ms;
  }

  button:hover {
    background: #117852;
  }
`

const formStyles = css`
  height: 240px;
  width: 365px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 0 0 2px 1px gray;
`

const mapStateToProps = reduxState => {
  return {
    userId: reduxState.user.user_id
  }
}

export default connect(mapStateToProps, { getUser })(Register)
