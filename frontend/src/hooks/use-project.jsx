import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelectedProjectContext } from "./selectProjectProvider";

const useProject=()=>{

    const { selectedProjectId } = useSelectedProjectContext();

    

    
    const {getToken}=useAuth();


    const {data: projects=[],isLoading,error,refetch}=useQuery({
        queryKey:['projects'],
        queryFn: async ()=>{
            const token=await getToken();
            const response=await axios.get('http://localhost:5000/api/getAllProjects',{
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            });
            return response.data.projects;
        },
        staleTime: 5 * 60 * 1000,
    });

//         catch(error){
//            console.error("Error fetching projects:", error);
//         }

//     }

//    useEffect(()=>{
//        fetchAllProjects();
//   },[])
    

const selectedProject = projects?.find((p) => p.id === selectedProjectId) || null;

       return {projects,isLoading,error,refetch,selectedProject
     };




};

export default useProject;