import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLazyQuery } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import { LOGIN_USER } from '../../queries/queries'
import { getUser } from '../../redux/userReducer'

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
      <form>
        <input onChange={e => setEmail(e.target.value)} value={email} />
        <input onChange={e => setPassword(e.target.value)} value={password} />
        <button onClick={e => signInUser(e)}>Login</button>
      </form>
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
  padding-top: 120px;
`

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getUser })(Login)
