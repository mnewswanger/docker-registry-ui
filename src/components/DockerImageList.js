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

    updateRegistryImages (ajaxTarget) {
        if (ajaxTarget === '') {
            return;
        }
        this.setState({
            hasFailed: false,
            namespaces: {}
        });
        axios.get(ajaxTarget)
            .then(res => {
                const dockerRegistryMeta = res.data;
                var namespaces = {};
                for (var i = 0; i < dockerRegistryMeta.repositories.length; i++) {
                    var split = dockerRegistryMeta.repositories[i].split('/');
                    var namespace = split[0];
                    if (!namespaces[namespace]) {
                        namespaces[namespace] = {
                            name: namespace.replace('-', ' '),
                            images: []
                        };
                    }
                    // const imageBase = this.state.registryApiUrl.replace('https://').replace('http://');
                    namespaces[namespace].images.push({
                        name: split.slice(1).join('/'),
                        documentationURL: this.props.documentationBaseURL + dockerRegistryMeta.repositories[i],
                        imageTagsApiUrl: this.state.registryApiUrl + '/v2/' + dockerRegistryMeta.repositories[i] + '/tags/list',
                        registryImagePath: stripProtocol(this.state.registryApiUrl) + '/' + dockerRegistryMeta.repositories[i]
                    });
                }
                this.setState({
                    namespaces: namespaces
                });
            })
            .catch(function (error) {
                console.log('Failed to load...');
                this.setState({hasFailed: true});
            }.bind(this));
    }

    componentWillReceiveProps (props) {
        if (props.registryApiUrl !== this.state.registryApiUrl) {
            this.setState({registryApiUrl: props.registryApiUrl});
            this.updateRegistryImages(props.registryApiUrl + '/v2/_catalog');
        }
    }

    componentDidMount () {
        if (this.props.registryApiUrl !== '') {
            this.updateRegistryImages(this.props.registryApiUrl + '/v2/_catalog');
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
                    />);
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
