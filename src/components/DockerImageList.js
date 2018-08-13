import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DockerImageNamespace from './DockerImageNamespace';

function stripProtocol(url) {
    return url.replace('https://','').replace('http://','');
}

class DockerImageList extends React.Component {
    static propTypes = {
        registryApiUrl: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            hasFailed: false,
            namespaces: {},
            registryApiUrl: this.props.registryApiUrl
        };
    }

    updateRegistryImages (apiEndpoint, append = false) {
        if (!apiEndpoint) {
            return;
        }

        this.setState({
            hasFailed: false
        });

        axios.get(apiEndpoint)
            .then(res => {
                const dockerRegistryMeta = res.data;
                var namespaces = append ? this.state.namespaces : {};

                dockerRegistryMeta.repositories.forEach(item => {
                    var split = item.split('/');
                    var namespace = split[0];
                    if (!namespaces[namespace]) {
                        namespaces[namespace] = {
                            name: namespace.replace('-', ' '),
                            images: []
                        };
                    }

                    namespaces[namespace].images.push({
                        name: split.slice(1).join('/'),
                        documentationURL: this.props.documentationBaseURL ? this.props.documentationBaseURL + item : null,
                        imageTagsApiUrl: this.state.registryApiUrl + 'v2/' + item + '/tags/list',
                        registryImagePath: stripProtocol(this.state.registryApiUrl) + item
                    });
                });

                this.setState({
                    namespaces: namespaces
                });

                if (res.headers.link) {
                    var nextLink = res.headers.link.match(/<(.+)>;/)[1];
                    this.updateRegistryImages(this.state.registryApiUrl + nextLink, true);
                }
            })
            .catch(function (error) {
                console.log('Failed to load...');
                this.setState({
                    hasFailed: true
                });
            }.bind(this));
    }

    componentWillReceiveProps (props) {
        if (props.registryApiUrl !== this.state.registryApiUrl) {
            this.setState({registryApiUrl: props.registryApiUrl});
            this.updateRegistryImages(props.registryApiUrl + 'v2/_catalog');
        }
    }

    componentDidMount () {
        if (this.props.registryApiUrl !== '') {
            this.updateRegistryImages(this.props.registryApiUrl + 'v2/_catalog');
        }
    }

    render () {
        if (this.state.hasFailed) {
            return <div>Failed to load from Docker Registry</div>;
        }

        var namespaces = [];
        var keys = Object.keys(this.state.namespaces);

        if (keys.length > 0) {
            for (var i = 0; i < keys.length; i++) {
                namespaces.push(
                    <DockerImageNamespace
                        name={this.state.namespaces[keys[i]].name}
                        images={this.state.namespaces[keys[i]].images}
                        key={keys[i]}
                    />
                );
            }

            return <div className="markdown-body">
                <h1>{stripProtocol(this.state.registryApiUrl)}</h1>
                {namespaces}
            </div>;
        }

        return <div>Loading...</div>;
    }
}

export default DockerImageList;
