import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    button: {
        margin: 10
    }
};

class DockerImageTag extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        tagURL: PropTypes.string.isRequired
    };

    render () {
        return <RaisedButton label={this.props.name} href={this.props.tagURL} style={styles.button} />
    }
}

export default DockerImageTag;
