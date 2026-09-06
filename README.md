# Role-Based Access Control (RBAC) System

A Next.js (App Router) role-based navigation and access control system using Zustand, JWT authentication, and Tailwind CSS.

---

## Tech Stack

* **Framework:** Next.js (App Router)
* **State Management:** Zustand (with localStorage persistence)
* **Security & Auth:** (JWT) & Cookies
* **Styling & Icons:** Tailwind CSS & Lucide React

---

## In-Memory Credentials

All accounts use the universal generic password: `password123`

| User | Email | Orders Permissions | Billing Permissions |
| :--- | :--- | :--- | :--- |
| **User A** | `userA@example.com` | `VIEW`, `CREATE` | `VIEW` |
| **User B** | `userB@example.com` | `VIEW` | `VIEW` |
| **Custom** | Registered via UI/API | Custom assigned | Custom assigned |

---

## REST API Endpoints

| Method | Endpoint | Access Rule | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public | Generates JWT token and session payload |
| `GET` | `/api/permissions` | Authenticated | Returns current user's module permission matrix |
| `GET` | `/api/orders` | `Orders: VIEW` | Fetches order list |
| `POST` | `/api/orders` | `Orders: CREATE` | Creates an order (`403` for User B) |
| `GET` | `/api/billing` | `Billing: VIEW` | Fetches billing invoice records |
| `POST` | `/api/users` | Public | Registers an in-memory user with custom permissions |

---

## Application Routes

* `/` – Dashboard portal and active session info.
* `/login` – User authentication via preset selection or custom credentials.
* `/register` – Create custom user with module-level permission checkboxes.
* `/orders` – Orders view (Order creation form guarded by `<Can perform="CREATE">`).
* `/billing` – Invoices view protected by `<RouteGuard module="Billing" action="VIEW">`.
* `/unauthorized` – 403 Forbidden page for restricted navigation.

---
