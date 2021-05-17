import React from 'react'

import Drawer from '@material-ui/core/Drawer'
import {withStyles} from '@material-ui/core'

const useStyles = theme => ({
    paper: {
        width: 400,
    },
});

class ConfigArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: this.props.open
        }
    }


    _toggle() {
        this.setState({open: !this.state.open})
    }

    render() {
        const {classes} = this.props;
        return (
            <Drawer
                classes={{paper: classes.paper}}
                variant="persistent"
                anchor="right"
                onRequestChange={this.props.onRequestChange}
                open={this.props.open} >
                {this.props.children}
            </Drawer>
        )
    }
}

export default withStyles(useStyles)(ConfigArea)
