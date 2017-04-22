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
            namespaces: {}
        };
    }

    componentDidMount() {
        axios.get(this.props.registryURL + 'v2/_catalog')
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
                        documentationURL: 'https://documentation.docker-registry.home.mikenewswanger.com/images/' + dockerRegistryMeta.repositories[i],
                        tagsURL: this.props.registryURL + 'v2/' + dockerRegistryMeta.repositories[i] + '/tags/list',
                        url: this.props.registryURL + dockerRegistryMeta.repositories[i]
                    });
                }
                this.setState({namespaces});
            });
    }

    render () {
        var namespaces = [];
        var keys = Object.keys(this.state.namespaces)

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
                    {namespaces}
                </div>
        }
        return <div>Loading...</div>
    }
}

export default DockerImageList;
