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
            documentationBaseURL: process.env.REACT_APP_DOCUMENTATIONURL,
            registryApiUrl: process.env.REACT_APP_APIURL,
            showSearchBar: false
        };

        this.registryApiUrl = this.state.registryApiUrl;
    }

    handleInputUpdate(event) {
        this.registryApiUrl = event.target.value;
    }

    loadDockerImages(event) {
        this.setState({registryApiUrl: this.registryApiUrl});
        event.preventDefault();
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
                        <form onSubmit={this.loadDockerImages.bind(this)}>
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
                        </form>
                    </div>
                </div>
                <div id="main-content">
                    <DockerImageList documentationBaseURL={this.state.documentationBaseURL} registryApiUrl={this.state.registryApiUrl} />
                </div>
            </div>
        </MuiThemeProvider>;
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
