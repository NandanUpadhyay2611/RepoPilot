import { getAuth } from "@clerk/express"
import prisma from "../prismaClient.js";

export const joinTeam=async(req,res)=>{
    const {projectId}=req.params

    const {userId}= getAuth(req);

    if(!userId) return res.redirect(`${process.env.FRONTEND_HOSTED_URL}/signin`);
    // const {userIdAfterSignin}= getAuth(req);

    const dbUser=await prisma.user.findUnique({
        where:{
            clerkId:userId
        }
    });

    const userIdDb=dbUser.id;

const project=await prisma.project.findUnique({
    where:{id:projectId}
});
// console.log('project join invite: ',project);

if(!project) return res.redirect(`${process.env.FRONTEND_HOSTED_URL}/dashboard`);

try{
    await prisma.userToProject.create({
        data:{userId:userIdDb,projectId}
    });
}
catch(error){
    console.log("User Already in project");
    
}

return res.redirect(`${process.env.FRONTEND_HOSTED_URL}/dashboard`)

}


    


