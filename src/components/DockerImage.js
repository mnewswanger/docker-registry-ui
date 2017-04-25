import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import DockerImageTag from './DockerImageTag';

const styles = {
    button: {
        margin: 10
    }
};

class DockerImage extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        registryImagePath: PropTypes.string.isRequired,
        imageTagsApiUrl: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            tags: []
        };
    }

    componentDidMount() {
        axios.get(this.props.imageTagsApiUrl)
            .then(res => {
                const tags = res.data.tags.sort();
                this.setState({tags});
            });
    }

    render () {
        var tags = [];
        for (var i = 0; i < this.state.tags.length; i++) {
            tags.push(<DockerImageTag
                    name={this.state.tags[i]}
                    key={i}
                    dockerImageWithTag={this.props.registryImagePath+':'+this.state.tags[i]}
                />);
        }
        return <div>
            <div className="docker-registry-image">
                <h2>{this.props.name}</h2>
                <h3>{this.props.registryImagePath}</h3>
                <RaisedButton label="Launch Documentation" href={this.props.documentationURL} style={styles.button} target="_blank" />
                <h3>Tags</h3>
                <ul className="tags-list">
                    {tags}
                </ul>
                <div className="clear"></div>
            </div>
            <Divider />
        </div>
    }
}

export default DockerImage;
