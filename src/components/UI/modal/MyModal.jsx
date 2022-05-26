import React from 'react';
import styles from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {

    const rootStyles = [styles.myModal]
    if (visible) {
        rootStyles.push(styles.active)
    }

    return (
        <div className={rootStyles.join(' ')}
            onClick={() => setVisible(false)}>

            <div className={styles.myModalContent}
                 onClick={(event => event.stopPropagation())}
            >
                {children}
            </div>
        </div>
    );
};

export default MyModal;