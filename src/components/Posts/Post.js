import React from 'react';

import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import {MoreHoriz, ThumbUpAlt, Delete} from '@mui/icons-material/';
import styles from './Post.module.css';

const Post=(props)=>{
    const NoImg='https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';
    return(
        <Card className={styles.card} style={{backgroundColor: "#f5e2f8"}}>

            <CardMedia className={styles.media} image={props.url} title={'test title'} />

            <div className={styles.overlay}>
                {/* <Typography variant="h6">{post.creator}</Typography> */}
                <Typography variant="h6">{props.title} </Typography>
                {/* <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography> */}
                <Typography variant="body2">Released: 2005 May</Typography>
            </div>

            <div className={styles.overlay2}>
                <Button style={{ color: "white" }} size="small" >
                    <MoreHoriz fontSize="large" />
                </Button>
            </div>

            <Typography className={styles.actorlist} variant="subtitle1" >
                Actors: John Singh, Brad Pitt
            </Typography>

            <div className={styles.summary} >
                <Typography variant="subtitle2" color="textSecondary" component="h4">
                    This is a summary of the ...
                </Typography>
            </div>

            <div className={styles.rating}>
                <Typography variant="body2" color="textSecondary" component="h2">
                    Rating: 4/5
                </Typography>
            </div>

            <CardActions className={styles.cardActions}>
                <Button size='small' color='primary'>
                    <ThumbUpAlt fontSize="small" /> <a>&nbsp; Like 3{" "}&nbsp;</a>
                </Button>
                <Button size='small' color='primary'>
                    <Delete fontSize='small' /> <a>&nbsp;Delete&nbsp;</a>
                </Button>                
            </CardActions>

        </Card>
    )
}

export default Post;