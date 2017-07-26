import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {Card, CardHeader, CardText} from 'material-ui/Card';
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
        var launchDocumentationButton = null
        if (this.props.documentationURL) {
            launchDocumentationButton = <RaisedButton label="Launch Documentation" href={this.props.documentationURL} style={styles.button} target="_blank" />
        }
        return <Card>
                <CardHeader
                    title={this.props.name}
                    actAsExpander={true}
                    showExpandableButton={true}
                    />
                <CardText expandable={true}>
                    {tags}
                    <br />
                    {launchDocumentationButton}
                </CardText>
        </Card>
    }
}

export default DockerImage;
