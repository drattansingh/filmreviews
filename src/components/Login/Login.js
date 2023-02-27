import React from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import styles from './Login.module.css';

const Login=(props)=>{
    return(
        <Card className={styles.loginCard} >
            <form>
                <div className={styles.formgroup} >
                    <label>Username: </label>
                    <input  />
                </div>

                <div className={styles.formgroup} >
                    <label>Password: </label>
                    <input  />
                </div>

                <div className={styles.formgroup} >
                    <label></label>
                    <Button>Login</Button>
                </div>
            </form>
        </Card>
    );
}

export default Login;