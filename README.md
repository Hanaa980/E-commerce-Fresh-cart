
# 🛒 E-commerce Fresh Cart

A full-featured e-commerce web application built with **React**, **Vite**, and **Redux Toolkit**, featuring user authentication, product browsing, shopping cart management, and checkout.

Live Demo: [🌐 Visit the App](https://hanaa980.github.io/E-commerce-Fresh-cart/)

---

## ✨ Features

- 🔐 **User Authentication** (Login / Register using JWT)
- 🛍️ **Browse Products** by categories
- 🔍 **Product Details** with full info
- ➕ **Add to Cart** with quantity updates
- 🧾 **Cart Summary** and remove items
- 💳 **Checkout Process** with address form
- 🌙 **Responsive Design** (Mobile friendly)
- 🎨 TailwindCSS UI with Font Awesome icons
- 🚀 Hosted on GitHub Pages

---

## 📸 Screenshots

Coming soon...

---

## ⚙️ Technologies Used

| Category        | Stack                                  |
|----------------|-----------------------------------------|
| Frontend        | React 18 + Vite 6                      |
| Styling         | Tailwind CSS + Flowbite               |
| State Mgmt      | Redux Toolkit + React-Redux           |
| Routing         | React Router DOM v7                   |
| Form Validation | Formik + Yup                          |
| HTTP Client     | Axios                                 |
| Auth            | JWT Decode                            |
| UI              | Font Awesome + React Toastify         |
| Dev Tools       | ESLint + gh-pages                     |

---

## 🚀 Getting Started

### 1️⃣ Clone and Install

```bash
git clone https://github.com/Hanaa980/E-commerce-Fresh-cart.git
cd E-commerce-Fresh-cart
npm install
````

### 2️⃣ Start Development Server

```bash
npm run dev
```

---

## 🧪 Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Run app in development mode          |
| `npm run build`   | Create a production-ready build      |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint on the codebase           |
| `npm run deploy`  | Deploy to GitHub Pages               |

---

## 🛠 Project Structure

```
E-commerce-Fresh-cart/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── App.jsx
│   └── main.jsx
├── .eslintrc
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🔐 Authentication Flow

1. **Login/Register** via form using email and password
2. JWT is stored and decoded on the client
3. Authenticated user can access protected routes (e.g. Cart, Checkout)

---

## 🛒 Shopping Flow

1. Browse products from the home or category pages
2. Click on a product to view its full details
3. Add to cart (quantity managed via Redux)
4. View cart summary and remove items if needed
5. Proceed to checkout and enter shipping address
6. Receive confirmation

---

## 🌐 Deployment

This app is deployed via `gh-pages`.

### To deploy manually:

```bash
npm run build
npm run deploy
```

It will be available at:
`https://hanaa980.github.io/E-commerce-Fresh-cart/`





