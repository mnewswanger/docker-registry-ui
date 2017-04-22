import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
//import { combineReducers } from 'redux';
//import { Provider } from 'react-redux';

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
            namespaces: {}
        };
    }


    render () {
        const baseURL = 'https://docker-registry.home.mikenewswanger.com/';
        const dockerRegistryMeta = {"repositories":["base/centos","build-servers/golang","build-servers/web-interface","general/php/7-fpm","general/php/nginx-fpm","generic/mkdocs","generic/php/7-fpm","generic/php/fpm-7","generic/php/fpm-7.1","generic/php/fpm-nginx","generic/php/nginx-fpm","infrastructure/mkdocs","kubernetes/service-router-configurator","nextcloud/nginx","templates/nginx","templates/php/7-fpm","templates/php/base","templates/php/fpm","templates/pip"]};

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
                name: split.join('/'),
                url: baseURL + dockerRegistryMeta.repositories[i]
            })
        }
        this.state.namespaces = namespaces;

        return <MuiThemeProvider>
                <div>
                    <Header />
                    <Paper id="content">
                        <DockerImageList namespaces={namespaces} />
                    </Paper>
                </div>
            </MuiThemeProvider>
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
