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
        name: PropTypes.string.isRequired
    };

    render () {
        return <RaisedButton style={styles.button} label={this.props.name} />
    }
}

export default DockerImageTag;
