import React from 'react'
import ReactDOM from 'react-dom'

import { PortalContainer } from '../styles/commonStyles'
import { ReactComponent as LeftIcon } from '../backArrow.svg'
import { BackButton } from '../styles/componentStyles'

const Portal = ({ children, onClick }) => {
  const modalElement = document.getElementById('modal')
  return ReactDOM.createPortal(
    <PortalContainer onClick={event => !event.target.closest("img") ? onClick() : null}>
      <React.Fragment>
        <BackButton onClick={onClick}>
          <LeftIcon />
        </BackButton>
        {children}
      </React.Fragment>
    </PortalContainer>,
    modalElement
  )
}

export default Portal
