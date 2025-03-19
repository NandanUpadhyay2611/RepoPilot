
import { useAuth, useUser } from "@clerk/clerk-react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const SyncUser=()=>{
    const navigate = useNavigate();
    const [status,setStatus]=useState('syncing user data')
    console.log('redirected by signin');
    
    const {isSignedIn,user}=useUser();
    const {userId}=useAuth();

    const { getToken } = useAuth();

    useEffect(() => {
        const helper = async () => {
            try {
                const token = await getToken();
                if (token) {
                    localStorage.setItem("authToken", token);
                    console.log(token);
                }
            } catch (error) {
                console.error("Error fetching token:", error);
            }
        };
        helper();
    }, [getToken]);  
    
    
    useEffect(()=>{
        if(isSignedIn && user){
            const syncUser=async()=>{
                try{
                    await axios.post('http://localhost:5000/api/sync-user',{
                        userId:userId,
                        emailAddress:user.emailAddresses[0]?.emailAddress,
                        firstName:user.firstName,
                        lastName:user.lastName,
                        imageUrl:user.imageUrl
                    });

                   navigate('/dashboard');

                  
                }
                catch(error){
                    console.error('Error Syncing user: ',error);
                    setStatus(`Error: ${error.message}`);
                }
            };

            syncUser();
            
        }
        else{
            setStatus('Not signed in. Redirecting to sign-in...');
            navigate('/signin');
        }


  },[isSignedIn,user]);

  return <div>{status}</div>
};

export default SyncUser;