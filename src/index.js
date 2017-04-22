import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';

import Paper from 'material-ui/Paper';

import Header from './components/Header';
import DockerImageList from './components/DockerImageList';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            baseURL: 'https://docker-registry.home.mikenewswanger.com/',
            namespaces: {}
        };
    }

    componentDidMount() {
        axios.get(this.state.baseURL + 'v2/_catalog')
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
                        tagsURL: this.state.baseURL + 'v2/' + dockerRegistryMeta.repositories[i] + '/tags/list',
                        url: this.state.baseURL + dockerRegistryMeta.repositories[i]
                    });
                }
                this.setState({namespaces});
            });
    }

    render () {
        return <MuiThemeProvider>
                <div>
                    <Header />
                    <Paper id="content">
                        <DockerImageList namespaces={this.state.namespaces} />
                    </Paper>
                </div>
            </MuiThemeProvider>
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
