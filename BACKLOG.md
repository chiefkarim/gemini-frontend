## **Epic: AI-Powered Readme file generator**

### **1. Automatic README File Generation**

- _As a user, I want to easily generate a README file so that I can onboard new developers faster._
- **Acceptance Criteria:**

  - A button to generate a README file
  - Pre-filled content with standard sections (Installation, Usage, Configuration, API Key, etc.)
  - Ability to edit the README before saving

  **⏳ Estimation:**

  - Junior: 4 days
  - Senior: 2 days  
    **🔗 Dependencies:** None  
    **🛠 Sprint:** **1**

---

### **2. Dockerizing the Application**

- _The application should be Dockerized to facilitate migration to other deployment services._
- **Acceptance Criteria:**

  - A `Dockerfile` with necessary configurations
  - A `docker-compose.yml` configuration if needed
  - Documentation on how to use Docker with the project

  **⏳ Estimation:**

  - Junior: 3 days
  - Senior: 1.5 days  
    **🔗 Dependencies:** None  
    **🛠 Sprint:** **1**

---

### **3. Implementing Authentication**

- _As a user, I want to sign up and log in securely so that my settings and data are protected._
- **Acceptance Criteria:**

  - Support for authentication (OAuth, email/password, or both)
  - Secure token-based session management
  - Ability to log out and manage sessions

  **⏳ Estimation:**

  - Junior: 6 days
  - Senior: 3 days  
    **🔗 Dependencies:** None  
    **🛠 Sprint:** **2**

---

### **4. Organizing Conversations Into Chat Sessions**

- _As a user, I want to create different chat sessions for better organization._
- **Acceptance Criteria:**

  - Ability to create, delete, and manage chat sessions
  - Interface to switch between different chat sessions
  - Sessions should be saved and accessible across devices

  **⏳ Estimation:**

  - Junior: 4 days
  - Senior: 2 days  
    **🔗 Dependencies:**
  - Requires **Authentication** to store user-specific sessions  
    **🛠 Sprint:** **2**

---

### **5. Using a Custom Gemini API Key**

- _As a user, I want to use my own Gemini API key so I am not restricted to the free quota._
- **Acceptance Criteria:**

  - A configuration field to add/update/remove an API key
  - Secure storage of the API key
  - Clear error messages in case of API key issues

  **⏳ Estimation:**

  - Junior: 3 days
  - Senior: 1.5 days  
    **🔗 Dependencies:**
  - Requires **Authentication** so API keys are stored per user  
    **🛠 Sprint:** **3**

---

### **6. Saving Results & Multi-Device Access**

- _As a user, I want to save my results and access them from different devices._
- **Acceptance Criteria:**

  - Authentication system to retrieve saved results
  - Automatic or manual result saving
  - Interface to view saved results

  **⏳ Estimation:**

  - Junior: 6 days
  - Senior: 3 days  
    **🔗 Dependencies:**
  - Requires **Authentication** to store and retrieve user-specific data  
    **🛠 Sprint:** **3**

---

### **7. Search Within Previous Results**

- _As a user, I want to be able to search within my previous results/chats so I can retrieve past results._
- **Acceptance Criteria:**

  - A search field filtering results by keywords
  - Ability to sort results by date
  - Display relevant results with highlighted search terms

  **⏳ Estimation:**

  - Junior: 5 days
  - Senior: 2.5 days  
    **🔗 Dependencies:**
  - Requires **Saving Results & Multi-Device Access** to be implemented first  
    **🛠 Sprint:** **4**

---

### **8. Uploading Files for Better Responses**

- _As a user, I want to upload different files so I can get more specific results._
- **Acceptance Criteria:**

  - Interface to upload files (.txt, .pdf, .docx, etc.)
  - Extraction and processing of file content
  - File type and size validation

  **⏳ Estimation:**

  - Junior: 5 days
  - Senior: 2.5 days  
    **🔗 Dependencies:** None  
    **🛠 Sprint:** **4**

---

### **9. Automatically Updating the Backlog File in GitHub**

- _As a user, I want to be able to update the backlog file in the GitHub repo automatically from here when I am done making changes._
- **Acceptance Criteria:**

  - A button to commit and push the updated backlog file to GitHub
  - Authentication with GitHub (OAuth or personal access token)
  - A preview of the changes before pushing
  - Confirmation message upon successful update

  **⏳ Estimation:**

  - Junior: 6 days
  - Senior: 3 days  
    **🔗 Dependencies:**
  - Requires **Authentication** for GitHub API integration  
    **🛠 Sprint:** **4**

---

### to be considered

- Move the next js frontend to Cloudflare because Vercel free license is limited to non profitable projects
