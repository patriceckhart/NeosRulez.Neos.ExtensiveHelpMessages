import React, {Fragment, PureComponent} from 'react';
import manifest from '@neos-project/neos-ui-extensibility';
import PropTypes from 'prop-types';
import ExtensiveHelpMessage from './ExtensiveHelpMessage';
import styles from './styles.css'
import {Icon} from "@neos-project/react-ui-components";

manifest('NeosRulez.Neos.ExtensiveHelpMessages:HelpMessages', {}, (globalRegistry, {frontendConfiguration}) => {
    const style = frontendConfiguration['NeosRulez.Neos.ExtensiveHelpMessages:Style'];
    const editorsRegistry = globalRegistry.get('inspector').get('editors');
    const editorsRegistryList = editorsRegistry._registry;
    for(let i in editorsRegistryList) {
        let editorKey = editorsRegistryList[i].key;
        let defaultEditorDefinition = editorsRegistry.get(editorKey);
        editorsRegistry.set(editorKey, {
            ...defaultEditorDefinition,
            component: editorWrapper(defaultEditorDefinition.component, style)
        });
    }
});

export default function editorWrapper(DefaultEditor, style) {
    return class EditorWrapper extends PureComponent {

        constructor(props) {
            super(props);
            this.state = {
                isToggleOn: false,
            };
            this.handleClick = this.handleClick.bind(this);
        }

        handleClick() {
            this.setState(prevState => ({
                isToggleOn: !prevState.isToggleOn
            }));
        }

        static propTypes = {
            helpMessage: PropTypes.object,
            helpThumbnail: PropTypes.object
        };

        render() {
            const {helpMessage, helpThumbnail} = this.props;

            return (<div className={styles.inspectorPropWrapper} >
                {helpMessage &&
                    <Fragment>
                        <button type="button" className={this.state.isToggleOn ? styles.extensiveHelpMessageButtonActive : styles.extensiveHelpMessageButton} onClick={this.handleClick} >
                            <Icon icon="fas fa-question-circle" />
                        </button>
                        <style dangerouslySetInnerHTML={{__html: '.style__envelope__tooltipButton___2pIzZ { display:none; }'}} />
                    </Fragment>
                }
                <DefaultEditor {...this.props} />
                {(helpMessage && this.state.isToggleOn) &&
                    <ExtensiveHelpMessage helpMessage={helpMessage} helpThumbnail={helpThumbnail} style={style} />
                }
            </div>);
        }
    }

}
