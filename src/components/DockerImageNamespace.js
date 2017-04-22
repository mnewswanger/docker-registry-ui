import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';

import DockerImage from './DockerImage';

class DockerImageNamespace extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        images: PropTypes.array.isRequired
    };

    render () {
        return <Paper className="docker-namespace">
            <Toolbar>
                <span className="toolbar-header">{this.props.name}</span>
            </Toolbar>
            <div className="container-content">
                <DockerImage />
            </div>
        </Paper>
    }
}

export default DockerImageNamespace;
