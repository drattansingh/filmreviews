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
            const result=await fetch(process.env.REACT_APP_NodeURL+'user/films',{
                method:'GET',
                headers:{ 'Content-Type': 'application/json',  }
            });

            const resultdata=await result.json(); // get the data from the server in json format

            setData({
                films:resultdata.films.map(film=>{  return{...film}  }),
                message:resultdata.message, totalcnt:resultdata.totalcnt});
        }
        catch(err){
            console.log('error encountered'+err);
            return(err);
        }
    },[]);

    // I had to put the useEffect here because then LoadPosts will already been defined
    useEffect(()=>{
        const socket=openSocket(process.env.REACT_APP_NodeURL);
        
        LoadPosts();
        
        // Cleanup - this is run before the effect is reached to clean up previous effects from previous renders
        // Thus will close the socket when the component unmounts
        return()=>socket.disconnect();
      },[LoadPosts]);




    const deleteFilm=(id)=>{
        console.log('delete button clicked');
        console.log(id);
    };

    return(
        data?   //If data has returned from node then display or else display loading text
        <>
            <MainHeader />
            {/* The pics folder must be in the public folder for the following code to work */}
            <Posts {...data} deleteFilm={deleteFilm} />
        </>
        :
        <>Loading</>
    );

}/**'const ContainerHome=()=>' delimiter */

export default ContainerHome
