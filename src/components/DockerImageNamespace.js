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
        var images = [];

        for (var i = 0; i < this.props.images.length; i++) {
            images.push(<DockerImage
                    name={this.props.images[i].name}
                    key={i}
                    documentationURL={this.props.images[i].documentationURL}
                    url={this.props.images[i].url}
                    tagsURL={this.props.images[i].tagsURL}
                />)
        }

        return <Paper className="docker-namespace">
            <Toolbar>
                <span className="toolbar-header">{this.props.name}</span>
            </Toolbar>
            <div className="container-content">
                {images}
            </div>
        </Paper>
    }
}

export default DockerImageNamespace;
