import React from 'react';

import Login from '../Login/Login';
import Searchbox from '../UI/Searchbox';

import styles from './MainHeader.module.css';

const MainHeader=()=>{
    return(
        <header className={styles['main-header']}>
            <h1>Rotten Tomatoes</h1>
            <Searchbox className={styles.searchbox} />
            <Login/>
        </header>
    );
}

export default MainHeader;