# CollabHub
# GitHub AI SaaS Platform

A modern AI-powered SaaS platform that enhances your GitHub workflow with intelligent insights, Q&A capabilities, and seamless collaboration.  
Built with **Next.js 15**, **Google Gemini AI**, and **NeonDB**, this project offers a production-ready, scalable, and user-friendly solution for developers and teams.

---

## 🚀 Features

- **📂 Project Management Dashboard**  
  Organize and manage your repositories effortlessly with a beautifully designed dashboard and sidebar layout.

- **🤖 GitHub RAG (Retrieval-Augmented Generation)**  
  Connect your GitHub repositories and leverage AI-powered contextual Q&A on your codebase.

- **📊 Commit Log Viewer**  
  Visualize and track commit history with detailed logs and timelines.

- **❓ Q&A with Your Repos**  
  Ask natural language questions about your repositories, powered by **Google Gemini AI**.

- **🎥 Meeting Card with AssemblyAI**  
  Transcribe and analyze meetings for actionable insights using **AssemblyAI**.

- **📨 Invite & Collaborate**  
  Share projects and collaborate seamlessly by inviting team members.

- **📦 Project Archiving**  
  Archive old projects without losing your data or progress.

- **🔐 Secure Authentication**  
  Powered by **Clerk** for modern, scalable, and secure user management.

- **💳 Subscription Management**  
  Integrate **Stripe** for seamless payments and subscription handling.

- **🎨 Elegant UI**  
  Designed with **Shadcn** and **Tailwind CSS** for a clean, responsive, and accessible user experience.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router  
- **UI Components**: Shadcn & Tailwind CSS
- **AI Engine**: Google Gemini AI for LLM-based Q&A  
- **Database**: NeonDB with ORM integration  
- **Authentication**: Clerk for secure and scalable auth  
- **Payments**: Stripe for subscription and billing  
- **Transcription**: AssemblyAI for meeting analysis  
- **Deployment**: Vercel or serverless hosting

---

## 📅 Development Timeline

1. **Project Initialization** – Setup repository, dependencies, and environment.
2. **Database Setup** – Configure **NeonDB** with ORM for efficient data handling.
3. **UI Foundations** – Integrate **Shadcn** and **Tailwind CSS**.
4. **Authentication** – Implement **Clerk** for secure login and user sessions.
5. **Layout & Navigation** – Build the dashboard layout with sidebar navigation.
6. **Project Management** – Create project pages for managing repos.
7. **Dashboard Features** – Implement analytics and overview on the dashboard.
8. **Commit Log Component** – Visualize repository commit history.
9. **Question Card Component** – Enable asking natural language questions.
10. **GitHub RAG Pipeline** – Explain and integrate the AI-powered RAG system.
11. **Q&A Page** – Build the interactive Q&A interface.
12. **Meeting Integration** – Setup meeting cards and **Firebase** for real-time updates.
13. **Transcription Service** – Integrate **AssemblyAI** for meeting transcriptions.
14. **Collaboration Tools** – Archive projects and enable team member invitations.
15. **Subscription Management** – Configure **Stripe** for payments.
16. **Deployment** – Launch on **Vercel**.

---

## 📸 Screenshots

*(Add screenshots of the dashboard, Q&A page, and commit log here)*

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL-compatible NeonDB instance
- Stripe and Clerk accounts
- Google Gemini AI API key
- AssemblyAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/iamrautela/collabhub.git

# Navigate into the project directory
cd collabhub

# Install dependencies
npm install

#Run Development Enviroment
npm run dev

