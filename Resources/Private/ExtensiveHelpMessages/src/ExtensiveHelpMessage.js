import React, {PureComponent} from 'react';
import styles from './styles.css'

class ExtensiveHelpMessage extends React.Component {

    render() {

        const style = {
            backgroundColor: this.props.style.backgroundColor,
            textColor: this.props.style.textColor,
            borderColor: this.props.style.borderColor,
        }

        return (
            <div className={styles.extensiveHelpMessageWrapper} >
                <div className={styles.extensiveHelpMessage} style={style} >
                    {this.props.helpThumbnail &&
                        <div className={styles.extensiveHelpMessageImage} >
                            <img src={'/_Resources/Static/Packages/' + this.props.helpThumbnail} />
                        </div>
                    }
                    <span dangerouslySetInnerHTML={{__html: this.props.helpMessage}} />
                </div>
            </div>
        );
    }
}

export default ExtensiveHelpMessage;
