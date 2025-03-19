import {GithubRepoLoader} from '@langchain/community/document_loaders/web/github'
import { generateEmbedding, summarizeCode } from './gemini'
import axios from 'axios'
import { Octokit } from 'octokit'
import { octokit } from './github'


const getFileCount=async (path,octokit,githubOwner,githubRepo,acc=0)=>{

    const {data}=await octokit.rest.repos.getContent({
        owner:githubOwner,
        repo:githubRepo,
        path
    })

    if(!Array.isArray(data) && data.type==='file'){ //if data is not array that means it is a file there are no directory
        return acc+1;
    }

    if(Array.isArray(data)){
        let fileCount=0;
        const directories=[];

        for(const item of data){
            if(item.type==='dir'){
                directories.push(item.path)
            }
            else{
                fileCount++;
            }
        }
        if(directories.length>0){
            const directoryCounts=await Promise.all(
                directories.map(dirPath=> getFileCount(dirPath,octokit,githubOwner,githubRepo,0))
            )
            fileCount+=directoryCounts.reduce((acc,count)=> acc+count,0);
        }

        return acc+fileCount;
    }
    return acc;
}


export const checkCredits=async (githubUrl,githubToken)=>{
    const ocktokit=new Octokit({ auth: import.meta.env.VITE_GITHUB_TOKEN,});
    const githubOwner=githubUrl.split('/')[3];
    const githubRepo=githubUrl.split('/')[4];
    if(!githubOwner || !githubRepo){
        return 0; 
    }

    const fileCount=await getFileCount('',ocktokit,githubOwner,githubRepo,0);
    return fileCount;
}

export const loadGithubRepo=async (githubUrl,githubToken)=>{
const loader=new GithubRepoLoader(githubUrl,{
    accessToken: githubToken || '',
    branch:'main',
    ignoreFiles: ['package-lock.json','yarn.lock','pnpm-lock.yaml','bun.lockb'],
    recursive: true,
    unknown:'warn',
    maxConcurrency:5
})

const docs=await loader.load()
return docs;

}

export const indexGithubRepo=async(githubUrl,githubToken,token,projectId)=>{
    const docs=await loadGithubRepo(githubUrl,githubToken)
    const allEmbeddings = await generateEmbeddings(docs); 

const processedEmbeddings = await Promise.all(
    allEmbeddings.map(async (embedding) => ({
        summary: embedding.summary,
        sourceCode: embedding.sourceCode,
        fileName: embedding.fileName,
        projectId:projectId,
        embedding: embedding.embedding
    }))
);

const embedds = await axios.post(`http://localhost:5000/api/addEmbeddings`, {
    embeddings: processedEmbeddings 
}, {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
});

    return embedds.data;
}

const generateEmbeddings=async (docs)=>{
    return await Promise.all(docs.map(async doc =>{
        const summary=await summarizeCode(doc)
        const embedding=await generateEmbedding(summary)
        console.log("Source Code: ",JSON.parse(JSON.stringify(doc.pageContent)));
        
        return {
            summary,
            embedding,
            sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
            fileName: doc.metadata.source,
        }
    }))
}