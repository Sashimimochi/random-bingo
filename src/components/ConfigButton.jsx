import React from 'react'

import MenuIcon from '@material-ui/icons/Menu'

const ConfigButton = props => {
    return (
        <a
        href="/"
        className="material-icons config-button"
        onClick={e => {
            e.preventDefault()
            props.onClick()
        }}>
            <MenuIcon fontSize="large" />
        </a>
    )
}

export default ConfigButton
