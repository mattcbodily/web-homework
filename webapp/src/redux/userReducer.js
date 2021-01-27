const initialState = {
  user: {}
}

const GET_USER = 'GET_USER'
const CLEAR_USER = 'CLEAR_USER'
const UPDATE_ROMAN_SETTING = 'UPDATE_ROMAN_SETTING'
const UPDATE_DARK_MODE = 'UPDATE_DARK_MODE'

export function getUser (userObj) {
  return {
    type: GET_USER,
    payload: userObj
  }
}

export function clearUser () {
  return {
    type: CLEAR_USER,
    payload: {}
  }
}

export function updateRomanSetting (bool) {
  return {
    type: UPDATE_ROMAN_SETTING,
    payload: bool
  }
}

export function updateDarkMode (bool) {
  return {
    type: UPDATE_DARK_MODE,
    payload: bool
  }
}

export default function userReducer (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_USER:
      return { ...state, user: payload }
    case CLEAR_USER:
      return { ...state, user: payload }
    case UPDATE_ROMAN_SETTING:
      var newUser = { ...state.user }
      newUser.romanNumeralSetting = payload

      return { ...state, user: newUser }
    case UPDATE_DARK_MODE:
      var newUserTwo = { ...state.user }
      newUserTwo.darkMode = payload

      return { ...state, user: newUserTwo }
    default:
      return state
  }
}
