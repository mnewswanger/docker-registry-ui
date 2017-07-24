import React from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    button: {
        margin: 10
    }
};

class DockerImageTag extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        dockerImageWithTag: PropTypes.string.isRequired
    };

    copyToClipboard = () => {
        copy(this.props.dockerImageWithTag);
    }


    render = () => {
        return <RaisedButton
            label={this.props.name}
            primary={this.props.name === "master"}
            secondary={this.props.name === "develop"}
            style={styles.button}
            onTouchTap={this.copyToClipboard}
            />
    }
}

export default DockerImageTag;
