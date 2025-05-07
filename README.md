# Ohiremen

Ohiremen is a React-based web application that allows authenticated users to search for openly licensed images and audio using the Openverse API. It features secure authentication, persistent search history (stored in Supabase), a responsive UI built with Bootstrap, and containerization via Docker for easy deployment.

---

## 🌟 Features

- 🔐 **User Authentication** using Supabase
- 🔍 **Media Search** via Openverse API (images and audio)
- 🕓 **Search History** grouped by date with ability to delete individual entries
- ⚙️ **Responsive UI** with React and Bootstrap
- 🐳 **Dockerized** with future Docker Compose support

---

## 🧰 Tech Stack

- **Frontend**: React, React Router, Bootstrap
- **Backend/Database**: Supabase (auth + storage)
- **API**: [Openverse API](https://api.openverse.org)
- **Authentication**: Supabase Auth
- **State Management**: React Hooks
- **Containerization**: Docker, Docker Compose
- **Testing**: Vitest, React Testing Library

---

## 🛠️ Installation & Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or above)
- [Docker](https://www.docker.com/) (optional for containerized build)
- [Supabase Project](https://supabase.com/) (create a project and get `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`)

---

### 🔧 Local Development (Without Docker)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/remediame/SE-Assesment.git
   ```

2. **Install dependencies:**

```
npm install
```

3. **Create a .env file in the root directory:**

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run the app:**

```
npm run dev

```

The app will be available at http://localhost:5173.
