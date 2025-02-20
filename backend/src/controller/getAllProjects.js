import prisma from "../prismaClient.js"
import { getAuth } from "@clerk/express";

export const getAllProjects=async (req,res)=>{
    const {userId}=getAuth(req);
    console.log('user Id get products',userId);
    const allProjects=await prisma.project.findMany({
        where:{userToProjects:{
            some:{
                userId:req.user.id
            },
            
        },
        deletedAt: null},
        
    })
    console.log(allProjects);
    
    return res.status(200).json({"projects":allProjects});
}