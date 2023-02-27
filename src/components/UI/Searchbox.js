import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as SVGIcons from '@fortawesome/free-solid-svg-icons'

import styles from './Searchbox.module.css';

const Searchbox=(props)=>{
    return(
        <div className={`${styles.wrap} ${props.className}`} >
            <div className={styles.search}>
                <input type='text' className={styles.searchTerm} placeholder='Movie Search' />
                <button type='submit' class={styles.searchButton}>
                    <FontAwesomeIcon icon={SVGIcons.faSearch} />
                </button>
            </div>
        </div>
    )
}

export default Searchbox;