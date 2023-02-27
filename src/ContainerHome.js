import React, {useState, useEffect, useCallback} from 'react';
import openSocket from 'socket.io-client';

import MainHeader from './components/MainHeader/MainHeader';
import Posts from './components/Posts/Posts';

const ContainerHome=()=>
{
    // const[data1, setData1]=useState([{url:"/pics/1.jpg", body:"df"},{url:"/pics/2.jpg", body:"df"}]);
    const[data, setData]=useState();

    


    // I had to useCallback to prevent this function from reloading when the useEffect reloads
    const LoadPosts=useCallback(async()=>{
        try{ 
            const result=await fetch('http://localhost:5001/user/films',{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                }
            });

            const resdata=await result.json(); // get the data from the server in json format
            // console.log(data);
            // setData(data);console.log(data); 

            // setData(resdata.map(film=>{
            //         return{
            //             // ...film,
            //             // ImagePath:film.imageUrl
            //             message: film.message
            //         }
            //     })
            // ); 

            console.log(resdata.films); 

            console.log(resdata.message);

            setData({
                films:resdata.films.map(film=>{
                    return{...film}
                }),
                message:resdata.message, totalcnt:resdata.totalcnt});

            // setData(resdata.map(film=>{
            //         return{
            //             // ...film,
            //             // ImagePath:film.imageUrl
            //             message: film.message
            //         }
            //     })
            // );

            console.log(data.films[2].imageUrl);



        }
        catch(err){
            console.log('error encountered'+err);
            return(err);
        }
    },[]);

    // I had to put the useEffect here because then LoadPosts will already been defined
    useEffect(()=>{
        const socket=openSocket('http://localhost:5001');
        
        LoadPosts();
        
        // Cleanup - this is run before the effect is reached to clean up previous effects from previous renders
        // Thus will close the socket when the component unmounts
        return()=>socket.disconnect();
      },[LoadPosts]);

    return(
        <>
            <MainHeader />
            {/* The pics folder must be in the public folder for the following code to work */}
            <Posts {...data} />
        </>
    )

}/**'const ContainerHome=()=>' delimiter */

export default ContainerHome