import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import DockerImageNamespace from './DockerImageNamespace';

class DockerImageList extends React.Component {
    static propTypes = {
        registryURL: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            hasFailed: false,
            namespaces: {},
            registryURL: this.props.registryURL
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
                    namespaces[namespace].images.push({
                        name: split.slice(1).join('/'),
                        documentationURL: this.props.documentationBaseURL + dockerRegistryMeta.repositories[i],
                        tagsURL: this.state.registryURL + '/v2/' + dockerRegistryMeta.repositories[i] + '/tags/list',
                        url: this.state.registryURL + dockerRegistryMeta.repositories[i]
                    });
                }
                this.setState({namespaces: namespaces});
            })
            .catch(function (error) {
                console.log('Failed to load...');
                this.setState({hasFailed: true});
            }.bind(this));
    }

    componentWillReceiveProps (props) {
        if (props.registryURL !== this.state.registryURL) {
            this.setState({registryURL: props.registryURL});
            this.updateRegistryImages(props.registryURL + '/v2/_catalog');
        }
    }

    componentDidMount () {
        if (this.props.registryURL !== '') {
            this.updateRegistryImages(this.props.registryURL + '/v2/_catalog');
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
                    <h1>{this.state.registryURL}</h1>
                    {namespaces}
                </div>;
        }
        return <div>Loading...</div>;
    }
}

export default DockerImageList;
