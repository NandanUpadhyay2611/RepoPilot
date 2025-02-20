import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useProject from '@/hooks/use-project';
import { pullCommits } from '@/lib/github';
import { useAuth } from '@clerk/clerk-react';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {useForm} from 'react-hook-form'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateProjectComponent=()=>{
    const {register,handleSubmit,reset}=useForm();
    const {getToken}=useAuth();
    // const {projects,fetchAllProjects}=useProject();
    const {isLoading}=useProject();
    const queryClient=useQueryClient();

    if (isLoading) {
        return <div>Loading projects...</div>;
    }
    
    const createProject=async (data)=>{
        try{
            const token=await getToken();
           
            console.log("hi",token);

            const response =await axios.post('http://localhost:5000/api/create-project',{
            projectName:data.projectName,
            repoUrl:data.repoUrl,
            githubToken:data.githubToken
        },
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
    });

    console.log(response);

    
    if(response.status===200){
        console.log("refetching...");
        
        // await refetch()
        await queryClient.invalidateQueries({queryKey:['projects']});
        toast.success('Project created successfully!');
      
        reset();
        console.log('fetching and adding commits...');
        await pullCommits(response.data.project.id,token);
        
    }
    
    // console.log("response: ",JSON.stringify(response.data));

    }
    catch(error){
        if (error.response) {
            console.error("Error response:", error.response.data);
            toast.error('Unable to create project');
          } else if (error.request) {
            console.error("No response received:", error.request);
            toast.error('No response from server');
          } else {
            console.error("Error:", error.message);
            toast.error('An error occurred');
          }
    }
        }


    function onSubmit(data){
        // window.alert(JSON.stringify(data))
        
        
             createProject(data);
            
           


           
        // return true;
    }
    return (
        <div className='flex items-center gap-12 h-full justify-center'>
            <img src='/undraw_github.svg' className='h-56 w-auto' />
            <div>
                <div>
                    <h1 className='font-semibold text-2xl'>
                        Link your Github Repository
                    </h1>
                    <p className='text-sm text-muted-foreground'>
                        Enter the URL of your repository to link it to RepoPilot
                    </p>
                </div>
                <div className="h-4"></div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input {...register('projectName' ,{required:true})}
                        placeholder='Project Name' type='text'/>
                        <div className="h-2"></div>
                        <Input {...register('repoUrl' ,{required:true})}
                        placeholder='Github Repository URL' type='url'/>
                         <div className="h-2"></div>
                        <Input {...register('githubToken')}
                        placeholder='Github Token (Optional)'/>
                        <div className="h-4"></div>

                        <Button type='submit' disabled={createProject.isPending}>
                            Create Project
                        </Button>

                    </form>
                </div>
            </div>
        </div>
    )
};


export default CreateProjectComponent;