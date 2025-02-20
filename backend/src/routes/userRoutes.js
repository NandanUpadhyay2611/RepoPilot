
import { Router } from "express";
const router=Router();
import syncUserController from "../controller/syncUserController.js";

import { createProjectController } from "../controller/createProjectController.js";
// import { requireAuth } from "@clerk/express";
import { auth } from "../middlewares/auth.js";
import { getAuth, requireAuth } from "@clerk/express";
import { getAllProjects } from "../controller/getAllProjects.js";
import { getCommits } from "../controller/getCommits.js";
import { addCommitsController } from "../controller/addCommits.js";
import { getProjectController } from "../controller/getProject.js";
// import { createProjectController } from "../controller/createProjectController.js";



router.post('/sync-user',syncUserController);
router.post('/create-project',auth,createProjectController);
router.get('/getAllProjects',auth,getAllProjects);
router.get('/getCommits/:projectId',auth,getCommits);
router.post('/addCommit',auth,addCommitsController);
router.get('/getProject/:projectId',auth,getProjectController);  //get single project by project id

export default router;

