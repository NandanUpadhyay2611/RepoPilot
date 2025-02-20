
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// export const pullComits=async (projectId,token)=>{
//     const {project,githubUrl}=await fetchProjectGithubUrl(projectId,token);
//     const commitHashes=await getCommitHashes(githubUrl);
//     const unprocessedCommits=await filterUnprocessedCommits(projectId,commitHashes,token); //make sure we dont always create summary for commits which are already present in our database

//     const summaryResponses = [];


// for (const commit of unprocessedCommits) {
//     try {
//         console.log(commit.commitHash);
//         const summary = await summarizeCommit(githubUrl, commit.commitHash);
        
//         summaryResponses.push({ status: "fulfilled", value: summary });
//     } catch (error) {
//         console.log(commit.commitHash);
//         summaryResponses.push({ status: "rejected", reason: error.message });
//     }

//     await delay(10000);
// }

//     // const summaryResponses=await Promise.allSettled(unprocessedCommits.map(commit=>{
//     //     return summarizeCommit(githubUrl,commit.commitHash)
//     // }))

// console.log(summaryResponses.length);
// console.log("SummaryResponses: ",summaryResponses);


//     const summaries=summaryResponses.map((response)=>{
//         if(response.status==='fulfilled'){
//             return response.value
//         }
//         return ""
//     })

//     const commits=await axios.post('http://localhost:5000/api/addCommit',
//     {  
//         commits:summaries.map((summary,index)=>({
//         projectId:projectId,
//         commitMessage: unprocessedCommits[index].commitMessage,
//         commitHash: unprocessedCommits[index]?.commitHash,
//         commitAuthorName: unprocessedCommits[index]?.commitAuthorName,
//         commitAuthorAvatar: unprocessedCommits[index]?.commitAuthorAvatar,
//         commitDate: unprocessedCommits[index]?.commitDate,
//         summary:summary

       
//     }))
// }
// ,
// {
//     headers:{
//         "Content-Type":"application/json",
//         Authorization:`Bearer ${token}`
//     }
// }

// )
// return commits.data
// }