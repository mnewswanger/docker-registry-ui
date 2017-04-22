import React from 'react';
import PropTypes from 'prop-types';

import DockerImageNamespace from './DockerImageNamespace';

class DockerImageList extends React.Component {
    static propTypes = {
        namespaces: PropTypes.object.isRequired
    };

    render () {
        var namespaces = [];
        var keys = Object.keys(this.props.namespaces)

        if (keys.length > 0) {
            for (var i = 0; i < keys.length; i++) {
                namespaces.push(
                    <DockerImageNamespace
                        name={this.props.namespaces[keys[i]].name}
                        images={this.props.namespaces[keys[i]].images}
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
