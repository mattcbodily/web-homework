import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'
import Settings from '../components/settings/Settings'

it('Settings displays on the document', () => {
    const { getByText } = render(<BrowserRouter><Settings /></BrowserRouter>)
    expect(getByText('Welcome to the settings page!')).toBeInTheDocument()
})

it('Change event works properly on input', () => {
    const { container } = render(<BrowserRouter><Settings /></BrowserRouter>)
    const numInput = container.querySelector('#num-input')
    
    fireEvent.change(numInput, { target: { value: '30' } })
    expect(numInput.value).toBe('30')
})

it('Roman Numeral p tag does not display on first render', () => {
    const { container } = render(<BrowserRouter><Settings /></BrowserRouter>)
    const romanNumeral = container.querySelector('#roman-numeral')

    expect(romanNumeral).not.toBeTruthy()
})

it('Button event displays roman numeral p tag', () => {
    const { container } = render(<BrowserRouter><Settings /></BrowserRouter>)
    const numInput = container.querySelector('#num-input')
    const romanizeBtn = container.querySelector('#romanize-btn')

    fireEvent.change(numInput, { target: { value: '30' } })
    fireEvent.click(romanizeBtn)

    expect(container.textContent).toContain('Roman Numeral:')
})