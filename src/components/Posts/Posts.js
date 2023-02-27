import React from 'react';

import Post from './Post';
import { Grid, CircularProgress } from '@material-ui/core';
import styles from './Posts.module.css';

const Posts=(props)=>{
    return(
        <Grid className={styles.maingrid} container alignItems='stretch' spacing={3} >
            {
                props.films.map(film=>(
                    <Grid item xs={4} sm={4} md={3} key={film._id} >
                        <Post url={film.imageUrl} title={film.title} />
                    </Grid>                    
                ))
            } 

 
            {/* <Grid item xs={4} sm={4} md={3}>
                <Post url={'/pics/1.jpg'} />
            </Grid>
            <Grid item xs={4} sm={4} md={3}>
                <Post url={'/pics/2.jpg'} />
            </Grid>
            <Grid item xs={4} sm={4} md={3}>
                <Post url={'/pics/3.png'} />
            </Grid>
            <Grid item xs={4} sm={4} md={3}>
                <Post url={'/pics/4.jpg'} />
            </Grid>
            <Grid item xs={4} sm={4} md={3}>
                <Post url={'/pics/5.png'} />
            </Grid> */}

        </Grid>
    );
}

export default Posts;