import React from 'react';
import PropTypes from 'prop-types';

import FlatButton from 'material-ui/FlatButton';

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

    render () {
        return <li><FlatButton label={this.props.name} style={styles.button} /> {this.props.dockerImageWithTag}</li>
    }
}

export default DockerImageTag;
