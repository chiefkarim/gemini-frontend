# 🌟 Gemini Frontend Chat

A **Next.js 13+** frontend for a chatbot, featuring authentication, markdown support, and syntax highlighting.

## 🚀 Live Deployment

You can access the live deployment here:  
[**Gemini Frontend Chat on Vercel**](#)

---

## 📖 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Introduction

Gemini Frontend Chat is a **Next.js 13+** application built with **TypeScript**. It integrates **NextAuth.js** for authentication, supports **Markdown**, and provides **syntax highlighting**.

## ✨ Features

- 🔑 **NextAuth.js** authentication with MongoDB.
- 🎨 **Tailwind CSS** for modern styling.
- 📝 **Markdown support** with `react-markdown`.
- 🌟 **Syntax highlighting** via `highlight.js`.
- ⚡ **Turbocharged Next.js 13+ frontend**.

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone git@github.com:yourusername/gemini-frontend.git
cd gemini-frontend
```

### 2️⃣ Install Dependencies Using `pnpm`

```bash
pnpm install
```

> You can also use `npm install` or `yarn install`, but `pnpm` is recommended.

### 3️⃣ Set Up Environment Variables

Create a `.env.local` file and configure it based on your API keys and settings.

---

## 🚀 Usage

### Running in Development

```bash
pnpm dev
```

Starts the development server with **Turbopack** enabled.

### Building for Production

```bash
pnpm build
```

Compiles the application for production.

### Running the Production Server

```bash
pnpm start
```

Runs the built application.

---

## 🔧 Configuration

Environment variables are stored in `.env.local`. A sample configuration is provided in `.env.example`.

To set up your environment, copy `.env.example` and rename it to `.env.local`:

```bash
cp .env.example .env.local
```

---

## 🗂️ Project Structure

```
gemini-frontend/
│── app/                  # Main Next.js app directory
│── public/               # Static assets
│── styles/               # Global styles
│── components/           # Reusable UI components
│── lib/                  # Utility functions
│── pages/                # API routes and page components (if applicable)
│── .env.local            # Environment variables (ignored in Git)
│── package.json          # Dependencies and scripts
│── tsconfig.json         # TypeScript configuration
│── tailwind.config.js    # Tailwind CSS configuration
│── next.config.ts        # Next.js configuration
│── README.md             # Documentation
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### 1️⃣ Switch to the Development Branch

```bash
git checkout development
git pull origin development
```

### 2️⃣ Create a New Branch

```bash
git checkout -b feature-branch-name
```

### 3️⃣ Make Your Changes & Commit

```bash
git add .
git commit -m "feat: describe your feature"
```

### 4️⃣ Push and Open a Pull Request

```bash
git push origin feature-branch-name
```

Create a **Pull Request (PR)** on GitHub, targeting the `development` branch.

---

## 📜 License

[MIT License](LICENSE) – Feel free to modify and use this project.

```

This README is structured and tailored for your **Next.js frontend project** with authentication and markdown support. Let me know if you'd like any modifications! 🚀
```
