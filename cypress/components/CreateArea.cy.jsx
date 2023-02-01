import React from 'react'
import CreateArea from '../../src/components/CreateArea'

describe('<CreateArea />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CreateArea />)
  })
})