import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import { LOGIN_USER } from '../../queries/queries'

const Login = () => {
  const [user, setUser] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginUser, { data }] = useLazyQuery(LOGIN_USER)

  const signInUser = async (e) => {
    e.preventDefault()

    await loginUser({
      variables: {
        email,
        password
      }
    })

    console.log(data)
    setUser(data)
  }

  return (
    <section css={loginStyles}>
      <h1>{user.firstName}</h1>
      <form>
        <input onChange={e => setEmail(e.target.value)} value={email} />
        <input onChange={e => setPassword(e.target.value)} value={password} />
        <button onClick={e => signInUser(e)}>Login</button>
      </form>
    </section>
  )
}

const loginStyles = css`
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 120px;
`

export default Login
