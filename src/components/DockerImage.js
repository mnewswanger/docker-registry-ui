import React from 'react';

import Chip from 'material-ui/Chip';

const styles = {
    chip: {
        marginRight: '10px',
        float: 'left'
    }
};

const DockerImage = () => (
    <div>
        <h2>Container</h2>
        <h3>Tags</h3>
        <Chip style={styles.chip}>Test</Chip>
        <Chip style={styles.chip}>Test</Chip>
        <Chip style={styles.chip}>Test</Chip>
        <div className="clear"></div>

        <h2>Container</h2>
        <p>Test</p>
    </div>
);

export default DockerImage;
