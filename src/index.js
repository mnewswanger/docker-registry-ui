import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';

import Paper from 'material-ui/Paper';

import Header from './components/Header';
import DockerImageList from './components/DockerImageList';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {
    render () {
        return <MuiThemeProvider>
                <div>
                    <Header />
                    <div id="main-content">
                        <DockerImageList registryURL="https://docker-registry.home.mikenewswanger.com/" />
                    </div>
                </div>
            </MuiThemeProvider>
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
