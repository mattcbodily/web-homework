import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import { v4 as uuidv4 } from 'uuid'
import { REGISTER_USER } from '../../queries/queries'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [registerUser] = useMutation(REGISTER_USER)

  const addUser = (e) => {
    e.preventDefault()

    if (firstName && lastName && email && password) {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        user_id: uuidv4()
      }

      registerUser({
        variables: userData
      })
    }
  }

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

export default Register

const registerStyles = css`
  min-height: 100vh;
  padding-top: 120px;
`
