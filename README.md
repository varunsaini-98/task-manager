## Assignments: 
### Notes App(frontend + backend) = https://github.com/varunsaini-98/notes-app.git
### Image upload feature = 
# TaskFlow - MERN Task Management System

TaskFlow is a robust, full-stack MERN (MongoDB, Express.js, React, Node.js) application designed for enterprise task tracking, team collaboration, and workflow management. It provides role-based access control, allowing Administrators to assign tasks and manage team members while enabling Employees to execute and update their task pipeline seamlessly.

---

## 🌟 Key Features

### 1. **Authentication & Role-Based Access Control**

- **Secure JWT Authentication**: HTTP-only cookie-based session management (`token`).
- **Role Hierarchy**:
  - **Admin**: Full administrative privileges — create/edit/trash tasks, assign team members, manage user accounts, and perform bulk trash/restore operations.
  - **Member / Employee**: View assigned tasks, update workflow stages, check off subtasks, and post comments/activity logs.

### 2. **Task & Workflow Management**

- **Kanban Board & Table Views**: Visual stage management across **To Do**, **In Progress**, and **Completed**.
- **Task Attributes**: Manage titles, descriptions, due dates, priority levels (**High**, **Medium**, **Normal**, **Low**), asset attachments, and external links.
- **Team Assignment**: Multi-member task assignment with instant visibility for assigned employees.
- **Stage Switcher**: Seamless stage transition dropdowns directly on task cards and detail pages.

### 3. **Subtasks & Activity Tracking**

- **Subtasks**: Breakdown complex work items into checkable subtasks with individual tags and due dates.
- **Activity & Comment Logs**: Chronological timeline tracking user comments and task status events.

### 4. **Trash & Lifecycle Management**

- **Soft Delete (Trash)**: Move tasks to the Trash bin (`isTrashed: true`) without permanent deletion.
- **Single & Bulk Restoration**: Restore individual or all trashed tasks (`restoreAll`) back to active status.
- **Permanent Deletion**: Delete single or all trashed tasks (`deleteAll`) permanently.

### 5. **Team & Account Administration**

- **Team Directory**: Filterable directory listing member roles, titles, emails, and account status.
- **Account Controls**: Activate or deactivate member profiles (`isActive: true/false`) with a single click.

### 6. **Dashboard & Metrics Overview**

- **Real-time Metrics Overview**: Text and metric card summary showing total tasks, status stage breakdowns (`todo`, `in progress`, `completed`), recent 10 tasks, and active users list (without visual graphs/charts).

---

## 🛠️ Tech Stack & Database Architecture

- **Frontend**: React.js, Vite, Axios, Context API
- **Backend**: Node.js, Express.js
- **Database Engine**: MongoDB & Mongoose ORM
- **Database Name**: `task-manager`
- **Port**: `5000`
- **MongoDB Collections**:
  - `users` – Stores user profiles, credentials, role permissions (`isAdmin`), job titles, account status (`isActive`), and assigned task IDs.
  - `tasks` – Stores task details, workflow stages (`todo`, `in progress`, `completed`), priority levels, assigned team arrays, subtasks, activity timelines, and soft-delete flags (`isTrashed`).
  - `notices` – Stores system alerts and task assignment notifications for team members.
- **Authentication**: JSON Web Tokens (JWT) stored in HTTP-Only Cookies (`cookie-parser`)
- **Styling**: Modern Responsive CSS

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Local MongoDB Server running on `mongodb://localhost:27017`

---

### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables (`.env`):**
   Create a `.env` file in the `backend/` root directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Start the Express server:**
   ```bash
   npm run dev
   ```
   The backend server will run on `http://localhost:5000`.

---

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```
   The application will open on `http://localhost:3000`.

---

## 🔌 API Endpoint Documentation

### User Routes (`/api/user`)

| Method   | Endpoint             | Access     | Description                                  |
| :------- | :------------------- | :--------- | :------------------------------------------- |
| `POST`   | `/api/user/register` | Public     | Register a new user account                  |
| `POST`   | `/api/user/login`    | Public     | Authenticate user & set JWT cookie           |
| `POST`   | `/api/user/logout`   | Protected  | Logout user & clear session cookie           |
| `GET`    | `/api/user/get-team` | Admin Only | Fetch all team members (supports `?search=`) |
| `PUT`    | `/api/user/:id`      | Admin Only | Activate or disable a user account           |
| `DELETE` | `/api/user/:id`      | Admin Only | Permanently delete a user account            |

---

### Task Routes (`/api/task`)

| Method   | Endpoint                                     | Access     | Description                                                                           |
| :------- | :------------------------------------------- | :--------- | :------------------------------------------------------------------------------------ |
| `GET`    | `/api/task/dashboard`                        | Protected  | Fetch dashboard metrics & task summaries                                              |
| `GET`    | `/api/task`                                  | Protected  | Get task list (Admin sees all; Member sees assigned)                                  |
| `GET`    | `/api/task/:id`                              | Protected  | Get full details for a single task                                                    |
| `POST`   | `/api/task/create`                           | Admin Only | Create & assign a new task                                                            |
| `PUT`    | `/api/task/update/:id`                       | Admin Only | Edit task details & team assignments                                                  |
| `PUT`    | `/api/task/change-stage/:id`                 | Protected  | Change workflow stage (`todo`, `in progress`, `completed`)                            |
| `PUT`    | `/api/task/create-subtask/:id`               | Admin Only | Add a subtask to an existing task                                                     |
| `PUT`    | `/api/task/change-status/:taskId/:subTaskId` | Protected  | Toggle subtask completion status                                                      |
| `POST`   | `/api/task/activity/:id`                     | Protected  | Post a comment or activity log entry                                                  |
| `PUT`    | `/api/task/:id`                              | Admin Only | Soft delete / Move task to Trash                                                      |
| `DELETE` | `/api/task/delete-restore/:id?`              | Admin Only | Restore (`restore`/`restoreAll`) or permanently delete (`delete`/`deleteAll`) task(s) |

---

## 🔒 Security Measures

- Passwords hashed securely using `bcryptjs`.
- JWT tokens transmitted exclusively via `httpOnly` cookies to protect against XSS attacks.
- Route middleware enforcement ensuring `protectRoute` and `isAdminRoute` protections on sensitive endpoints.

---

## 📄 License

This project is licensed under the MIT License.
