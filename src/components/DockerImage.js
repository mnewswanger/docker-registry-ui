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
        tagsURL: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            tags: []
        };
    }

    componentDidMount() {
        axios.get(this.props.tagsURL)
            .then(res => {
                console.log(res.data);
                const tags = res.data.tags.sort();
                this.setState({tags});
            });
    }

    render () {
        var tags = [];
        for (var i = 0; i < this.state.tags.length; i++) {
            tags.push(<DockerImageTag name={this.state.tags[i]} key={i} tagURL={this.props.url+':'+this.state.tags[i]} />);
        }
        return <div>
            <div className="docker-registry-image">
                <h2>{this.props.name}</h2>
                <RaisedButton label="Image URL" href={this.props.url+':master'} style={styles.button} />
                <RaisedButton label="Launch Documentation" href={this.props.documentationURL} style={styles.button} />
                <h3>Tags</h3>
                {tags}
                <div className="clear"></div>
            </div>
            <Divider />
        </div>
    }
}

export default DockerImage;
