# 🍽️ MealMastery

Welcome to **MealMastery**! Our app is designed to help you discover, create, and filter delicious recipes. Whether you're looking for detailed recipe information or want to contribute your own, MealMastery is here to simplify your cooking journey.

## 🌟 Features

- **Recipe Listings**: Explore a wide variety of recipes with detailed information such as ingredients, healthy score, price, equipment, and steps.
- **Recipe Creation**: Create your own recipes and share them with the MealMastery community.
- **Search and Filter**: Easily search and filter recipes by title, diet, or other criteria.
- **Detailed Views**: Get comprehensive details about each recipe by clicking on any recipe card.

## 🛠️ Technologies Used

### Frontend:

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for responsive designs.
- **Framer Motion**: A library for smooth animations.
- **React Router**: For navigation and routing within the app.
- **i18next**: For internationalization and localization support.

### Backend:

- **Express.js**: A Node.js framework for building the server-side API.
- **PostgreSQL**: Our database, hosted on Railway.
- **Spoonacular API**: Source for recipe data, stored in our PostgreSQL database.
- **Nodemon**: For automatic server restarts during development.
- **Axios**: To handle HTTP requests.

## 🧑‍🍳 Usage Guide

- **Landing Page**: Start on the landing page where you'll find featured recipes and recipe categories by diet.
- **Recipe Details**: Click on any recipe to view its detailed information, including ingredients, steps, and more.
- **Search & Filter**: Use the search bar in the navbar to find recipes by title or apply filters on the recipes page.
- **Create a Recipe**: Navigate to the recipe creation page from the navbar or footer, fill in the required inputs, and create your recipe.

## 🚀 Deployment

Currently, MealMastery is not deployed, but we plan to use **Railway** for the backend and **Netlify** or **Vercel** for the frontend.

## 📦 Installation and Setup

To run MealMastery locally, ensure you have **Node.js v20.10.0** or later installed. Here's how to set it up:

1. Clone the repository:

   ```bash
   git clone https://github.com/YepesF/MealMystery.git
   ```

2. Install the dependencies for both the frontend and backend:

   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../api
   npm install
   ```

3. Run the application:

   - Frontend: `npm run dev`
   - Backend: `npm run dev`

4. Visit `http://localhost:5173` to view the application in your browser.

## 🗂️ Project Structure

The MealMastery project is organized as follows:

- **api/**: Contains the backend logic of the application.
  - **src/**: Holds all the backend source code, including controllers, database queries, services, and utilities.
  - **routes/**: Defines the API routes for the application.
  - **controllers/**: Manages the logic for handling requests and responses.
  - **services/**: Implements the business logic.
  - **database/**: Manages the database queries and connections.
  - **utils/**: Contains utility functions.
  - **.env**: Environment configuration file for backend secrets.
- **client/**: Contains the frontend code of the application.
  - **src/**: Includes all the frontend source code, such as components, hooks, and layouts.
  - **components/**: Houses reusable UI components like buttons, cards, filters, navbar, and pagination.
  - **layouts/**: Defines the main layout structures like landing pages and recipe pages.
  - **hooks/**: Custom hooks for managing state and API calls.
  - **public/**: Public assets like images and icons.
  - **App.jsx**: Main React component that initializes the app.
  - **index.html**l: Entry point HTML file.
  - **i18n.js**: Internationalization setup for multi-language support.

```plaintext
api/
├── node_modules/
├── src/
│   ├── constants/
│   ├── controllers/
│   ├── database/
│   ├── queries/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── index.js
├── .env
├── .eslintrc.cjs
├── package-lock.json
├── package.json

client/
├── node_modules/
├── src/
│   ├── api/
│   ├── components/
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Drawer/
│   │   ├── FilterChip/
│   │   ├── Filters/
│   │   ├── Footer/
│   │   ├── Input/
│   │   ├── NavBar/
│   │   ├── Navfilters/
│   │   ├── Pagination/
│   │   ├── Search/
│   │   └── Typography/
│   ├── constants/
│   ├── data/
│   ├── hooks/
│   ├── layouts/
│   │   ├── LandingPage/
│   │   ├── NewRecipe/
│   │   ├── PageLayout/
│   │   ├── RecipePage/
│   │   └── RecipesPage/
│   ├── public/
│   ├── utils/
│   ├── App.css
│   ├── App.jsx
│   ├── i18n.js
│   ├── index.css
│   ├── main.jsx
├── index.html
├── .prettierrc
├── package-lock.json
├── package.json
└── postcss.config.js
```

This structure ensures a clean separation of concerns between the backend and frontend, making the project easy to maintain and scale.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## 📄 License

MealMastery is licensed under the MIT License. See `LICENSE` for more information.
