import React, { Component } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/themes/dark.min.css';
import 'froala-editor/css/themes/royal.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import { withTheme } from '@material-ui/core/styles';

class Editor extends Component {
    constructor(props) {
        super(props)

        this.handleManualController = this.handleManualController.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.getConfig = this.getConfig.bind(this);

        this.state = {
            theme: this.props.theme.palette.type === 'light' ? 'royal' : this.props.theme.palette.type,
            initControls: null,
            model : '',
            config: { theme: this.props.theme.palette.type === 'light' ? 'royal' : this.props.theme.palette.type}
        }
        
    }


    handleManualController(initControls) {
        this.initControls = initControls.initialize();
        this.setState({initControls});
    }

    handleModelChange(model) {
        this.setState({ model });
    }

    getConfig() {
        let config = {
            theme: this.state.theme,
            ...this.props.config
        }
        if (this.props.theme.typography &&
             this.props.theme.typography.fontFamily) {
            config = {
                fontFamily: this.props.theme.typography.fontFamily,
                theme: this.state.theme,
                ...this.props.config
            }
        }
        return config;
    }

    componentDidUpdate(prevProps, prevState) {
        const { theme } = this.props
        if (theme !== prevProps.theme) {

            let selectedThemeName = 'royal';

            if (theme.palette.type === 'dark') {
                selectedThemeName = 'dark';
            }



            const editorInstanceDestroyed = new Promise((resolve, reject) => {
                this.state.initControls.destroy();
                if (this.state.initControls.getEditor) {
                    resolve("destroyed");
                } else {
                    reject("Not destroyed");
                }
            })

            // this.state.initControls.destroy();

            this.setState({ theme: selectedThemeName }, () => {

                editorInstanceDestroyed.then(destroyed => {
                    this.state.initControls.initialize();
                })

                // if (editorInstanceDestroyed === "destroyed") {
                //     this.state.initControls.initialize();
                // }
            });
            
        }
    }

    render() {
        const config = this.getConfig();
        return (
        <FroalaEditor tag="textarea" config={config}
            onManualControllerReady={this.handleManualController}
            // model={this.state.model}
            // onModelChange={this.handleModelChange}
             />
        );
    }
}

Editor.defaultProps = {
    config: {}
}
export default withTheme(Editor);