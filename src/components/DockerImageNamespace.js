import React from 'react';
import PropTypes from 'prop-types';

import {Card, CardHeader, CardText} from 'material-ui/Card';

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
                    registryImagePath={this.props.images[i].registryImagePath}
                    imageTagsApiUrl={this.props.images[i].imageTagsApiUrl}
                />)
        }

        return <Card className="docker-namespace">
            <CardHeader
                title={this.props.name}
                actAsExpander={true}
                showExpandableButton={true}
                />
            <CardText expandable={true}>
                <div className="container-content">
                    {images}
                </div>
            </CardText>
        </Card>
    }
}

export default DockerImageNamespace;
