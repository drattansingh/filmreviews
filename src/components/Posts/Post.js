import React from 'react';

import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import {MoreHoriz, ThumbUpAlt, Delete} from '@mui/icons-material/';
import Truncate from '../Truncate/index';


import styles from './Post.module.css';

const Post=(props)=>{
    const NoImg='https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';
    
    // set the rating variable here because it must be done before returning the JSX code below
    // If the amount of reviews is greater than zero display the rating else display
    // zero reviews for this film
    var rating='';
    if(props.reviewcnt>0) rating=`${props.reviewavg} / 5, total ${props.reviewcnt} reviews`;
    else rating=`total ${props.reviewcnt} reviews`;

    // set the user like variables here
    const userlike=props.userlikecnt>0?props.userlikecnt:'';
    
    return(
        <Card className={styles.card} style={{backgroundColor: "#f5e2f8"}}>

            {/* <CardMedia className={styles.media} image={'http://localhost:5001/'+props.imageUrl} title={'test title'} /> */}
            <CardMedia className={styles.media} image={process.env.REACT_APP_NodeURL+props.imageUrl} title={'test title'} />

            <div className={styles.overlay}>
                {/* <Typography variant="h6">{post.creator}</Typography> */}
                <Typography variant="h6">{props.title} </Typography>
                {/* <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography> */}
                <Typography variant="body2">Released:&nbsp;
                    {new Date(props.releaseDate).getFullYear()}&nbsp;
                    {new Date(props.releaseDate).toLocaleString('en-US', {month: 'long'})}
                </Typography>
            </div>

            <div className={styles.overlay2}>
                <Button style={{ color: "white" }} size="small" >
                    <MoreHoriz fontSize="large" />
                </Button>
            </div>

            <Typography className={styles.actorlist} variant="subtitle1" >
                Actors:&nbsp;
                {
                    // The mainCast field of the props is really an array in JSON format, 
                    // use the map method to convert it back to an array and display the values 
                    // which are the Actors
                    // Also if the index is 2 or more lesser than the length of the array then display commas ,
                    // This will output commas between the cast actors except the very last one
                    props.mainCast.map((value, index, array)=>{
                        if(index<=array.length-2) return(`${value.name}, `);
                        else return(value.name);
                    })
                }
            </Typography>

            <div className={styles.summary} >
                <Typography variant="subtitle2" color="textSecondary" component="h4" >
                    <Truncate text={props.summary} maxCharacters={100} />
                </Typography>
            </div>

            <div className={styles.rating}>
                <Typography variant="body2" color="textSecondary" component="h2">                    
                    Rating:&nbsp;{rating}
                </Typography>
            </div>

            <CardActions className={styles.cardActions} >
                <Button size='small' color='primary'>
                    <ThumbUpAlt fontSize="small" /> <a>&nbsp; Like {userlike} {" "}&nbsp;</a>
                </Button>
                <Button size='small' color='primary' onClick={()=>props.deleteFilm(props._id)} >
                    <Delete fontSize='small'/> <a>&nbsp;Delete&nbsp;</a>
                </Button>                
            </CardActions>

        </Card>
    )
}

export default Post;
