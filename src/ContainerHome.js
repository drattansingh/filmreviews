import React, {useState, useEffect, useCallback} from 'react';
import openSocket from 'socket.io-client';

import MainHeader from './components/MainHeader/MainHeader';
import Posts from './components/Posts/Posts';

const ContainerHome=()=>
{
    // const[data1, setData1]=useState([{url:"/pics/1.jpg", body:"df"},{url:"/pics/2.jpg", body:"df"}]);
    const[data, setData]=useState();

    


    // I had to useCallback to prevent this function from reloading when the useEffect loads
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


    
    // I had to useCallback to prevent this function from reloading when the useEffect loads
    const deleteFilm=useCallback(async(id)=>{
        try{ 
            console.log('delete button clicked');
            console.log(id);

            const result=await fetch(process.env.REACT_APP_NodeURL+'user/film/like/'+id,{
                method:'DELETE',
                headers:{ 'Content-Type': 'application/json',  },
                body: JSON.stringify({userid: '64023deba2d315e2224e7eba'})
            });
        }
        catch(err){
            console.log('error encountered'+err);
            return(err);
        }
    },[]);



    // I had to useCallback to prevent this function from reloading when the useEffect loads
    const toggleUserLike=useCallback(async(id)=>{ const tempuserid='64023deba2d315e2224e7ebb';
        try{  //console.log('user like button clicked with id of: '+id);

            // Call method from node to determine if the user has a like on the film or not
            const status=await fetch(process.env.REACT_APP_NodeURL+'user/film/likestatus/'+id,{
                method:'POST',
                headers:{ 'Content-Type': 'application/json',  },
                body: JSON.stringify({userid: tempuserid})
            });

            // The user has a like on the film, thus unlike it
            if((await status.json()).message==='true'){ //console.log('true')
                const result2=await fetch(process.env.REACT_APP_NodeURL+'user/film/like/'+id,{
                    method:'DELETE',
                    headers:{ 'Content-Type': 'application/json',  },
                    body: JSON.stringify({userid: tempuserid})
                });
                console.log(result2)

                // decrement the data film count
                // setData(prevState=>prevState.films.map(film=>{
                //     if(film._id===id)
                //         return{
                //             ...film,
                //             userlikecnt:prevState.userlikecnt+5,
                //         }
                //     return film;
                // }));
                
                console.log(id)

                // setData(prevState=>prevState.map(item=>{

                //     item.films.map(film=>{
                //         if(film._id===id){
                //             console.log('dfdfdfd')
                //                 film.userlikecnt='45'
                //         }
                //         return film;
                //     })

                //     return item
                // }));

                setData(prevState=>{
                    prevState.films.map(film=>{
                        if(film._id===id){
                            console.log('dfdfdfd')
                                film.userlikecnt='45'
                                console.log(film.userlikecnt)
                        }
                        return film;
                    })
                })

                


                // setData(prevState=>{
                //     // if(prevState.films._id===id)
                //     // return{
                //     //                 ...prevState.film,
                //     //                 userlikecnt:'9',
                //     //             }
                //     //         return prevState;
                //     const temp={...prevState};
                //     prevState.films.map(film=>{
                //         if(film._id===id) {
                //             console.log('dfdfdfd')
                //             // film.userlikecnt='45'
    
                //         }   
                //         return film;
                //     })


                    
                // });



            }
            // The user does NOT have a like on the film, thus like it
            else{  //console.log('false')
                const result2=await fetch(process.env.REACT_APP_NodeURL+'user/film/like/'+id+'/'+tempuserid,{
                    method:'GET',
                    headers:{ 'Content-Type': 'application/json',  }
                });
                console.log(result2)
            }            
        }
        catch(err){
            console.log('error encountered'+err);
            return(err);
        }
    },[]);


    // I had to put the useEffect here because then LoadPosts will already been defined
    useEffect(()=>{    console.log('use effect was triggered')    
        LoadPosts(); // load from node server the films for the home page

        const socket=openSocket(process.env.REACT_APP_NodeURL);

        // listen to events
        socket.on('films', data=>{
            if(data.action==='create user film like'){

            }
        })

        
        // Cleanup - this is run before the effect is reached to clean up previous effects from previous renders
        // Thus will close the socket when the component unmounts
        return()=>socket.disconnect();
      },[LoadPosts, deleteFilm, toggleUserLike]);

    return(
        data?   //If data has returned from node then display or else display loading text
        <>
            <MainHeader />
            {/* The pics folder must be in the public folder for the following code to work */}
            <Posts {...data} deleteFilm={deleteFilm} toggleUserLike={toggleUserLike} />
        </>
        :
        <>Loading</>
    );

}/**'const ContainerHome=()=>' delimiter */

export default ContainerHome
