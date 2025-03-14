# RepoPilot

# 🏗️ Tech Stack  
- **Frontend:** React.js 
- **Backend:** Express.js   
- **Database:** PostgreSQL  
- **AI Framework:** LangChain 
- **Vector Database:**
- **API's:** Gemini, Octokit  
- **UI Components:** ShadCN UI 

## 📌 Index  
- [📖 Project Theory](#-project-theory)  
- [🚀 How to Run](#-how-to-run)  
- [🎥 Demo](#-demo)  
- [🤝 Contributing](#-contributing)

  ## 📖 Project Theory  

### Introduction  
Repo-Pilot is an AI-powered developer collaboration platform designed to simplify repository management, enhance code understanding, and improve teamwork. The platform leverages AI-driven documentation, commit summarization, and intelligent codebase search to streamline the development workflow.  

### Basic Working Flow of Repo-Pilot:  
1. **Commit Message Summarization:** AI extracts key insights from commits, providing concise summaries for better tracking of repository changes.  
2. **Context-Aware Codebase Search:** Developers can quickly locate specific functions, files, or components within the codebase using intelligent search.  
3. **GitHub RAG Pipeline:** Repo-Pilot ensures seamless synchronization with GitHub repositories, keeping the documentation and insights up to date.  
4. **Collaborative Features:** Team members can interact within the platform, review documentation, and access AI-powered insights to improve collaboration.  

### Motivation/Need of Project  
Repo-Pilot was developed to address key challenges in software development collaboration:  
- **Enhancing Repository Transparency:** Understanding a large codebase can be overwhelming, especially for new contributors. Repo-Pilot automates documentation to bridge this gap.  
- **Improving Code Search Efficiency:** Traditional code search tools often fail to capture contextual relevance. Repo-Pilot’s AI-powered search improves accuracy.  
- **Summarizing Commit History:** Keeping track of repository changes manually is tedious. Repo-Pilot automates this process with AI-driven commit summaries.    

### Limitations  
- AI-generated documentation may require occasional manual verification for accuracy.  
- The efficiency of search results depends on the quality of vector embeddings.  
- Performance may be affected when handling extremely large repositories.  

### Future Scope  
- **Advanced AI Integration:** Improving AI models to generate more precise and contextual documentation.  
- **Enhanced UI/UX:** Refining the user experience to make collaboration even more intuitive.  
- **AI-Powered Meeting Transcription:** Repo-Pilot will enable automated meeting transcription, extracting key discussion points to provide a clear and structured record of conversations.  
- **Real-Time Contextual Meeting Search:** Developers will be able to search past meetings intelligently, retrieving relevant discussions and decisions instantly.

## 🚀 How to Run  
-  **Frontend**
```bash
$ git clone https://github.com/NandanUpadhyay2611/RepoPilot.git  
$ cd frontend  
$ npm install  
$ npm run dev
```
- **Server**
```bash
$ cd backend
$ npm install
$ node ./src/index.js
$ npx prisma studio
```
## 🔧 Environment Variables  

Create a `.env.local` file in the frontend directory and add the following variables:  

```plaintext
VITE_CLERK_PUBLISHABLE_KEY=RldiQ  
VITE_GITHUB_TOKEN=your_github_token_here  
VITE_GEMINI_KEY=your_gemini_api_key_here  
```
Create a `.env` file in the backend directory and add the following variables

```plaintext
DATABASE_URL="your_postgress_url_here"  
PORT=5000  
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here  
CLERK_SECRET_KEY=your_clerk_secret_key_here
```

## 🤝 Contributing  

Contributions are welcome to improve Repo-Pilot! Here are some ways you can contribute:  

- **Report Issues:** Found a bug? Have a feature request? Open an issue!  
- **Submit Pull Requests:** Fork the repo, create a new branch, and submit a PR with your changes.  
- **Improve Documentation:** Help us enhance the project documentation for better clarity.  
- **Suggest Enhancements:** Share ideas to extend Repo-Pilot's capabilities.  

---
Feel free to add some value. You can see `Future Scope` for ideas.
💡 **Feel free to fork, modify, and enhance Repo-Pilot!**  
🚀 Enjoy coding, and pull requests are highly appreciated!  
