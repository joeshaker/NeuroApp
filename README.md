# 🎓 Course Platform Frontend (Angular 20)

The **Course Platform Frontend** is a modern, modular, and scalable web application built using **Angular 20**.  
It provides a smooth learning experience for students and a powerful management interface for instructors and admins.  

This frontend consumes a **.NET Core Web API backend** that handles business logic, authentication, payments, and data storage.

---

## 🌟 Key Features

- 🎨 **Responsive UI** built with Angular 20 and TailwindCSS / Bootstrap
- 🔐 **Authentication & Authorization** via JWT tokens
- 🧭 **Route Guards** for protected routes (Admin, Instructor, Student)
- 🔁 **HTTP Interceptors** for handling JWT tokens and API errors globally
- 📚 **Course Management** (Create, Edit, Enroll, View)
- 💳 **Integrated Checkout** for free and paid courses
- 🧠 **Dynamic Dashboard** with analytics and role-based views
- ⚙️ **Backend Integration** with ASP.NET Core Web API
- 🐳 **Docker Support** for containerized deployment

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend Framework** | Angular 20 (Standalone Components) |
| **Language** | TypeScript |
| **Styling** | TailwindCSS / Bootstrap 5 |
| **State Management** | RxJS + Angular Services |
| **Routing & Navigation** | Angular Router |
| **Auth Handling** | JWT + Route Guards + Interceptors |
| **Backend Integration** | .NET Core Web API |
| **Deployment** | Docker |

---

## 🧠 Architecture Overview

The frontend follows a **modular, scalable structure**:



---

## ⚙️ Prerequisites

Make sure you have the following installed:

| Tool | Version | Installation |
|------|----------|--------------|
| [Node.js](https://nodejs.org/) | 18+ | [Download](https://nodejs.org/en/download) |
| [Angular CLI](https://angular.dev/tools/cli) | 20.0.4 | `npm install -g @angular/cli` |
| [Docker](https://docs.docker.com/get-docker/) | Latest | For container deployment |
| [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) | 8.0+ | For backend API |

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/course-platform-frontend.git
cd course-platform-frontend

