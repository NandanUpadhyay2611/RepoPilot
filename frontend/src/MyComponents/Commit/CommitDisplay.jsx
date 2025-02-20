import useProject from "@/hooks/use-project";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";

const CommitDisplay=()=>{
    const {getToken}=useAuth();
    const {selectedProject}=useProject();
    const [commitsToDisplay,setCommitsToDisplay]=useState([]);

    const getCommits=async ()=>{
        try{
            const token=await getToken();
            const response=await axios.get(`http://localhost:5000/api/getCommits/${selectedProject.id}`,
                {
                    headers:{
                       "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                    }
                }
            )
            const commits=response.data;
            return commits
        }
        catch(error){
            console.log("Error in fetching commits inside commit display",error);
            
        }
        
    }

    useEffect(() => {
        const fetchCommits = async () => {
            const commits = await getCommits(); 
            if (commits) {
                setCommitsToDisplay(commits);
            }
        };
    
        if (selectedProject) {
            fetchCommits();
        }
    }, [selectedProject]);
    
  
console.log("Selected Project in commit display: ",selectedProject);
console.log("commits",commitsToDisplay);


return (
    <div>
        {commitsToDisplay.length > 0 ? (
            commitsToDisplay.map((commit, index) => (
                <div key={index}>
                    <p><strong>Message:</strong> {commit.commitMessage}</p>
                    <p><strong>Author:</strong> {commit.commitAuthorName}</p>
                    <p><strong>Date:</strong> {commit.commitDate}</p>
                    <p><strong>Summary:</strong>{commit?.summary}</p>
                    <hr />
                </div>
            ))
        ) : (
            <p>No commits found.</p>
        )}
    </div>
);


}

export default CommitDisplay