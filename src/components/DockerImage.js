import React from 'react';
import PropTypes from 'prop-types';

import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';

const styles = {
    chip: {
        marginRight: '10px',
        float: 'left'
    }
};

class DockerImage extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired
    };

    render () {
        return <div>
            <div className="docker-registry-image">
                <h2>{this.props.name}</h2>
                <p>{this.props.url}</p>
                <h3>Tags</h3>
                <Chip style={styles.chip}>Test</Chip>
                <Chip style={styles.chip}>Test</Chip>
                <Chip style={styles.chip}>Test</Chip>
                <div className="clear"></div>
            </div>
            <Divider />
        </div>
    }
}

export default DockerImage;
