# 🛍️ TasteHub – Business Model Overview

**TasteHub** is an e-commerce platform for purchasing food items and ingredients, enriched with dynamic recipe recommendations. It blends shopping and cooking into one seamless experience, encouraging users to explore, cook, and shop all in one place.

---

## 💡 Key Business Goals


- **Boost user engagement** by integrating inspiring, easy-to-follow recipes.
- **Enhance conversion rates** with real-time stock validation and seamless UX.
- - **Increase basket size** through recipe-based suggestions (Need to implement)

---

## 🔧 Platform Architecture

- **Micro Frontends**:
  - `Host (Shell App)`: Main e-commerce functionality using **Redux**.
  - `Remote App (Recipes)`: Integrated via `vite-plugin-federation`, using **Zustand**.

- **Tech Stack**:
  - **Frontend**: React + Vite + Tailwind CSS
  - **State Management**: Redux Toolkit (Shell), Zustand (Remote)
  - **Backend**: Node.js + Express
  - **Database**: MongoDB
  - **Deployment**: AWS S3 (host and remotes separated, public deployment)

---

## 🧠 Key Features & Business Benefits

| Feature                         | Business Impact                                           |
|-------------------------------|------------------------------------------------------------|
| 🛒 Product + Recipe Browsing  | Encourages multi-item purchases through contextual recipes |
| ✅ Real-Time Stock Validation | Reduces failed orders and builds trust                     |                 |
| 🔄 Lazy-Loaded Remote Recipes | Faster load times and modular development                  |
| 📦 Order Flow + Cart System   | Ensures clear path to purchase    |

## 📊 Future Potential

- **Personalized Recommendations** using user behavior + AI
- **Meal Planning Mode** that auto-fills cart with ingredients


---

## 🚀 Deployment

- Hosted on **AWS S3**, separated by host and remotes.
- GitHub Actions automate build & deploy for each micro frontend.

---

## 🙋‍♀️ Want to contribute?

Feel free to fork and suggest improvements! Recipes, localization, and UX ideas welcome.




