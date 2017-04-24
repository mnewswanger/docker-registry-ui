import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import DockerImageList from './components/DockerImageList';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            documentationBaseURL: 'https://documentation.docker-registry.home.mikenewswanger.com/images/',
            registryURL: 'https://docker-registry.home.mikenewswanger.com',
            showSearchBar: false
        };

        this.registryURLInput = this.state.registryURL;
    }

    handleInputUpdate(event) {
        this.registryURLInput = event.target.value;
    }

    loadDockerImages() {
        this.setState({registryURL: this.registryURLInput});
    }

    toggleSearchBar() {
        this.setState({showSearchBar: !this.state.showSearchBar});
    }

    render () {
        return <MuiThemeProvider>
                <div>
                    <div id="header">
                        <AppBar
                            title="Docker Images"
                            onLeftIconButtonTouchTap={this.toggleSearchBar.bind(this)}
                        />
                        <div className="target-url" style={{display: this.state.showSearchBar ? 'block' : 'none' }}>
                            <TextField
                                hintText="https://docker-registry"
                                floatingLabelText="Docker Registry URL"
                                defaultValue={this.state.registryURL}
                                onChange={this.handleInputUpdate.bind(this)}
                                fullWidth={true}
                            />
                            <RaisedButton
                                label="Load"
                                onTouchTap={this.loadDockerImages.bind(this)}
                            />
                        </div>
                    </div>
                    <div id="main-content">
                        <DockerImageList documentationBaseURL={this.state.documentationBaseURL} registryURL={this.state.registryURL} />
                    </div>
                </div>
            </MuiThemeProvider>;
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
