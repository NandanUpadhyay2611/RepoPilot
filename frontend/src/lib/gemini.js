import {GoogleGenerativeAI} from '@google/generative-ai'

const genAI=new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
const model=genAI.getGenerativeModel({
    model:'gemini-1.5-flash'
})

export const aiSummarizeCommit=async (diff)=>{

    // https://github.com/docker/genai-stack/commit/<commithash>.diff
    const response=await model.generateContent([
        `You are an expert programmer, and you are trying to summarize a git diff.
Reminders about the git diff format:
For every file, there are a few metadata lines, like (for example):
\`\`\`
diff --git a/lib/index.js b/lib/index.js
index aadf691..bfef603 100644
--- a/lib/index.js
+++ b/lib/index.js
\`\`\`
This means that \` lib/index.js \` was modified in this commit. Note that this is only an example.
Then there is a specifier of the lines that were modified.

A line starting with "+" means it was added.
A line starting with "-" means that line was deleted.
A line that starts with neither "+" nor "-" is code given for context and better understanding.
It is not part of the diff.
[...]
Example Summary Comments:
\`\`\`
*Raised the amount of returned recordings from "10" to "100" [packages/server/recordings_api.ts], [packages/server/constants.ts]
*Fixed a typo in the GitHub action name [.github/workflows/gpt-commit-summarizer.yml]
*Moved the "octokit" initialization to a separate file [src/octokit.ts], [src/index.ts]
*Added an OpenAI API for completions [packages/utils/apis/openai.ts]
*Lowered numeric tolerance for test files
\`\`\`
Most commits will have fewer comments than this example list.
The last comment does not include the file names.
Because there were more than two relevant files in the hypothetical commit.
Do not include parts of the example in your summary.
It is given only as an example of appropriate comments."

    'Please summarise the following diff file: \n\n${diff},`
    ])


    return response.response.text();
}


export async function summarizeCode(doc){
    // console.log("Getting summary for: ",doc.metadata.source);
    const code=doc.pageContent.slice(0,10000) //limit to 10000 characters

    const response=await model.generateContent([
        `You are an intelligent senior software engineer who specialises in onboardinq junior software engineers onto projects Example Summary Comments:
\`\`\`
*This `.gitignore` file prevents various files and directories from being tracked by Git.  It ignores compiled code (`.o`, `.exe`, etc.), build artifacts (`.log`, `.tmp`), IDE-specific files (`.sln`, `.vscode`), package management directories (`node_modules`, `venv`), and temporary/backup files (`*~`, `.bak`).  Essentially, it keeps the repository clean by excluding files that are not directly related to the source code and are likely to vary across different development environments.

*`proxy_parse.c` is a HTTP request parsing library.  It defines `ParsedRequest` and `ParsedHeader` structures to represent parsed HTTP requests,  providing functions to parse a raw request buffer into these structures (`ParsedRequest_parse`, `ParsedHeader_parse`),  manipulate headers (set, get, remove), and reconstruct the request from the parsed structures (`ParsedRequest_unparse`).  The code includes error handling and debugging features.  It supports only GET requests and basic HTTP versions.

*This C code implements a caching proxy server.  It handles client HTTP requests, connects to the target server, retrieves the response, and caches it for future requests using a Least Recently Used (LRU) cache.  The server uses threads to handle multiple clients concurrently, employing semaphores to manage concurrency and mutexes for cache access. Error handling includes sending appropriate HTTP status codes.  The `proxy_parse.h` file (not shown) provides parsing functionality for HTTP requests.

\`\`\`
Do not include parts of the example in your summary.
It is given only as an example of appropriate comments.`,

        
 `You are onboarding a junior software enqineer and explaining to them the purpose of the ${doc.metadata.source} file
 Here is the code: 
 ---
 ${code}
 ---
        Give a summary no more than 100 words of the code above
 `,
    ])

    return response.response.text()
}

export async function generateEmbedding(summary){
    const model=genAI.getGenerativeModel({
        model:"text-embedding-004"
    })
    const result=await model.embedContent(summary)
    const embedding=result.embedding
    return embedding.values
}

// console.log(await generateEmbedding("hello World"));
