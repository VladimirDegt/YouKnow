# YouKnow / Iwonder

A cross-platform application for discovering interesting facts, quotes, and educational content.  
This repository contains both the **frontend** (React Native + Expo) and **backend** (NestJS) parts.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Monorepo Structure](#monorepo-structure)
- [Frontend](#frontend)
  - [Features](#features)
  - [Project Structure](#frontend-project-structure)
  - [Setup & Run](#frontend-setup--run)
  - [Deployment](#frontend-deployment)
- [Backend](#backend)
  - [Features](#backend-features)
  - [Project Structure](#backend-project-structure)
  - [Setup & Run](#backend-setup--run)
  - [Deployment](#backend-deployment)
- [License](#license)
- [Author & Contact](#author--contact)

---

## Project Overview

**YouKnow / Iwonder** is a mobile and web application that provides users with various categories of content:

- Fun facts
- Science facts
- Quote of the day
- This day in history
- Question of the day
- Health
- Motivation

The backend provides REST API endpoints, content management, health checks, and scheduled tasks.

---

## Tech Stack

- **Frontend:** React Native, Expo, TypeScript, Zustand, React Navigation, i18next, Axios
- **Backend:** NestJS, TypeScript, REST API, Mailer, Scheduler, Cache, Jest

---

## Monorepo Structure

```
root/
│
├── frontend/      # React Native + Expo app
│
└── backend/       # NestJS API server
```

---

## Frontend

### Features

- Cross-platform: Android, iOS, Web (Expo)
- Modern navigation (React Navigation)
- State management (Zustand)
- Localization (i18next)
- Real-time content loading
- Interactive UI
- TypeScript-first

### <a id="frontend-project-structure"></a>Project Structure

```
frontend/
├── app/                  # App entry, navigation, layouts
│   ├── (tabs)/           # Tab navigation screens
│   ├── onboarding.tsx    # Onboarding screen
│   └── content.tsx       # Main content screen
├── src/
│   ├── components/       # Reusable UI components
│   ├── constants/        # App constants (colors, categories)
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services (e.g., api.ts)
│   ├── store/            # Zustand stores
│   ├── types/            # TypeScript types
│   └── assets/           # Images, icons
├── assets/               # Static resources
├── package.json
└── app.json
```

### <a id="frontend-setup--run"></a>Setup & Run

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   # or
   yarn install
   ```

2. **Environment variables:**  
   Create a `.env` file in the root of `frontend/` and add:

   ```
   EXPO_PUBLIC_OPENAI=your_openai_key
   EXPO_PUBLIC_API_KEY_OPENAI=your_base_url
   ```

3. **Start the app:**
   ```bash
   npm start
   # or
   yarn start
   ```
   - For web: `npm run web`
   - For Android/iOS: use Expo Go or device simulator

### <a id="frontend-deployment"></a>Deployment

- **Expo EAS Build:**  
  The project supports [Expo EAS Build](https://docs.expo.dev/eas/).  
  To build for production:

  ```bash
  npx eas build --platform android
  npx eas build --platform ios
  ```

  See `eas.json` for build profiles.

- **Web Deployment:**  
  To build static web output:
  ```bash
  npm run web
  ```
  Deploy the `web-build/` directory to your static hosting provider.

---

## Backend

### <a id="backend-features"></a>Features

- RESTful API (NestJS)
- Health checks
- Content management (facts, quotes, etc.)
- Scheduled tasks (cron)
- Email notifications (Mailer)
- Caching
- Validation (class-validator)
- Unit & e2e tests (Jest)

### <a id="backend-project-structure"></a>Project Structure

```
backend/
├── src/
│   ├── app.controller.ts      # Main controller
│   ├── app.service.ts         # Main service
│   ├── main.ts                # App entry point
│   ├── health/                # Health check module
│   ├── content/               # Content API (controller, service, DTOs)
│   ├── support/               # Support modules
│   └── utils/                 # Utilities
├── test/                      # Tests
├── package.json
└── nest-cli.json
```

### <a id="backend-setup--run"></a>Setup & Run

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Environment variables:**  
   Create a `.env` file in the root of `backend/` and add required variables (see code/config).

3. **Start the server:**

   ```bash
   npm run start:dev
   ```

4. **Run tests:**
   ```bash
   npm run test
   ```

### <a id="backend-deployment"></a>Deployment

- **Production build:**
  ```bash
  npm run build
  npm run start:prod
  ```
- **Environment:**  
  Make sure to set all required environment variables in `.env` for production.

- **Hosting:**  
  You can deploy the backend to any Node.js-compatible server (VPS, cloud, Docker, etc.).

---

## License

MIT

---

## Author & Contact

- **Author:** Degtyarev
- **Contact:** [your-email@example.com]
- **Support:** Use the in-app support form (Profile → Support tab) for user questions.

---

If you need more details or want to contribute, please contact the project maintainer.
