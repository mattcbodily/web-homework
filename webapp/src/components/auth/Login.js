import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import { LOGIN_USER } from '../../queries/queries'
import { getUser } from '../../redux/userReducer'
import divvyLogo from '../../assets/divvy-logo-dark.png'

const Login = ({ history, user, getUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginUser, { data }] = useLazyQuery(LOGIN_USER)

  const signInUser = (e) => {
    e.preventDefault()

    loginUser({
      variables: {
        email,
        password
      }
    })
  }

  useEffect(() => {
    if (user.user_id) {
      history.push('/home')
    }
  }, [])

  useEffect(() => {
    if (data && data.user) {
      getUser(data.user)
      history.push('/home')
    }
  }, [data])

  return (
    <section css={loginStyles}>
      <img alt='Divvy' src={divvyLogo} />
      <h1>Welcome to the Divvy Challenge</h1>
      <form css={formStyles}>
        <input onChange={e => setEmail(e.target.value)} placeholder='Email' value={email} />
        <input onChange={e => setPassword(e.target.value)} placeholder='Password' type='password' value={password} />
        <button onClick={e => signInUser(e)}>Login</button>
      </form>
      <p>No account? <Link to='/register'>Register here</Link></p>
    </section>
  )
}

Login.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
  getUser: PropTypes.func
}

const loginStyles = css`
  box-sizing: border-box;
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
    margin-top: 5px;
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
  height: 145px;
  width: 365px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 0 0 2px 1px gray;
`

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getUser })(Login)
