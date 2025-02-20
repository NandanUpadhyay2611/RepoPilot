
import { getAuth,clerkClient } from '@clerk/express';
import prisma from '../prismaClient.js';

export const createProjectController=async (req,res)=>{
    const {projectName,repoUrl,githubToken}=req.body;
    const {userId}=getAuth(req);
    console.log('create',userId);
    

    const user=await clerkClient.users.getUser(userId);
    // res.json({user});
    const project=await prisma.project.create({
        data:{
          name:projectName,
          githubUrl:repoUrl,
          userToProjects:{
            create:{
                user:{connect:{clerkId:userId}}
            }
          }
        }
    })
    return res.status(200).json({ project })
    
}

// module.exports=createProjectController