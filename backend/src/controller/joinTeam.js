import { getAuth } from "@clerk/express"
import prisma from "../prismaClient.js";

export const joinTeam=async(req,res)=>{
    const {projectId}=req.params

    const {userId}= getAuth(req);

    if(!userId) return res.redirect('http://localhost:5173/signup')

    const dbUser=await prisma.user.findUnique({
        where:{
            clerkId:userId
        }
    });

    const userIdDb=dbUser.id;

const project=await prisma.project.findUnique({
    where:{id:projectId}
});

if(!project) return res.redirect("http://localhost:5173/dashboard");

try{
    await prisma.userToProject.create({
        data:{userId:userIdDb,projectId}
    });
}
catch(error){
    console.log("User Already in project");
    
}

return res.redirect(`http://localhost:5173/dashboard`)

}


    


