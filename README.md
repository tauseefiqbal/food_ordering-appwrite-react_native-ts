# Fast Food — Mobile Food Ordering App

A full-stack cross-platform mobile food ordering application built with **React Native (Expo SDK 57)**, **TypeScript**, **NativeWind (Tailwind CSS)**, **Zustand**, **Appwrite** (Auth, Databases, Storage, Functions), **Stripe Checkout**, and **Sentry**.

---

## Table of Contents

- [Fast Food — Mobile Food Ordering App](#fast-food--mobile-food-ordering-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Authentication & User Management](#authentication--user-management)
    - [Home, Menu Discovery & Search](#home-menu-discovery--search)
    - [Shopping Cart & Customizations](#shopping-cart--customizations)
    - [Stripe Checkout & Order Processing](#stripe-checkout--order-processing)
    - [Monitoring, UI & Cross-Platform Support](#monitoring-ui--cross-platform-support)
  - [Tech Stack](#tech-stack)
    - [Frontend & Mobile Framework](#frontend--mobile-framework)
    - [State Management & Styling](#state-management--styling)
    - [Backend & Cloud Services (Appwrite)](#backend--cloud-services-appwrite)
    - [Payments & Observability](#payments--observability)
  - [Deployment](#deployment)
    - [Live Application URL](#live-application-url)
    - [Backend & Serverless Endpoints](#backend--serverless-endpoints)
  - [Test and Admin Users Credentials](#test-and-admin-users-credentials)
    - [Regular Test User Credentials](#regular-test-user-credentials)
    - [Admin User Credentials](#admin-user-credentials)
  - [How to Use App for Regular User](#how-to-use-app-for-regular-user)
    - [1. Sign Up or Sign In](#1-sign-up-or-sign-in)
    - [2. Browse Offers on the Home Tab](#2-browse-offers-on-the-home-tab)
    - [3. Search and Filter Menu Items](#3-search-and-filter-menu-items)
    - [4. Manage Your Cart](#4-manage-your-cart)
    - [5. Complete Checkout with Stripe](#5-complete-checkout-with-stripe)
    - [6. View Profile & Sign Out](#6-view-profile--sign-out)
  - [How to Use App for Admin User](#how-to-use-app-for-admin-user)
    - [1. Access the Appwrite Console](#1-access-the-appwrite-console)
    - [2. Seed or Reset Menu & Category Data](#2-seed-or-reset-menu--category-data)
    - [3. Manage Menu Items, Categories & Customizations](#3-manage-menu-items-categories--customizations)
    - [4. Manage Storage Assets](#4-manage-storage-assets)
    - [5. Monitor Orders & Stripe Webhook Executions](#5-monitor-orders--stripe-webhook-executions)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the App](#running-the-app)
  - [Environment Variables](#environment-variables)
    - [Client Environment Variables (`.env`)](#client-environment-variables-env)
    - [Serverless Function Environment Variables](#serverless-function-environment-variables)
  - [Appwrite Backend Architecture](#appwrite-backend-architecture)
    - [Database Collections](#database-collections)
    - [Storage Bucket](#storage-bucket)
    - [Stripe Payment Appwrite Function](#stripe-payment-appwrite-function)
  - [Project Structure](#project-structure)
  - [Available Scripts](#available-scripts)

---

## Features

### Authentication & User Management
- ✅ Email and password registration with automatic profile and avatar generation via Appwrite Avatars.
- ✅ Persistent session authentication with automatic session recovery on app launch.
- ✅ Automatic database profile provisioning if an authenticated user document is missing in the `user` collection.
- ✅ Protected route navigation separating `(auth)` screens (`sign-in`, `sign-up`) and `(tabs)` screens.
- ✅ Dedicated Profile screen displaying user details, delivery location, and one-tap sign-out.

### Home, Menu Discovery & Search
- ✅ Curated promotional offer cards on the Home screen (`SUMMER COMBO`, `BURGER BASH`, `PIZZA PARTY`, `BURRITO DELIGHT`).
- ✅ Real-time keyword search across menu items powered by debounced input (`use-debounce`).
- ✅ Dynamic category filter pills (`All`, `Burgers`, `Pizzas`, `Burritos`, `Sandwiches`, `Wraps`, `Bowls`) fetched from Appwrite Databases.
- ✅ Two-column staggered grid layout on the Search tab with product imagery served from Appwrite Storage.

### Shopping Cart & Customizations
- ✅ Global reactive cart state powered by Zustand (`store/cart.store.ts`).
- ✅ Intelligent line-item grouping that differentiates identical menu items with different customizations.
- ✅ Real-time quantity increment, decrement, item removal, and live cart badge counter in the header.
- ✅ Automatic calculation of subtotal, delivery fee (`$5.00`), discount (`-$0.50`), and final order total.

### Stripe Checkout & Order Processing
- ✅ Secure server-side price calculation via the `payments-with-stripe` Appwrite Function (never trusting client-supplied prices).
- ✅ In-app browser Stripe Checkout session flow using `expo-web-browser` and deep-link redirection (`fastfood://payment-result`).
- ✅ Automated webhook verification (`checkout.session.completed`) that records completed orders in Appwrite Databases.
- ✅ Automatic cart clearing and confirmation feedback upon successful payment return.

### Monitoring, UI & Cross-Platform Support
- ✅ Custom typography using the `Quicksand` font family (`Regular`, `Medium`, `SemiBold`, `Bold`, `Light`).
- ✅ Utility-first styling with NativeWind v4 and Tailwind CSS.
- ✅ Crash reporting, error tracking, user feedback, and mobile session replay powered by `@sentry/react-native`.
- ✅ Runs across Android, iOS, and Web via Expo Router v57.

---

## Tech Stack

### Frontend & Mobile Framework
- **Expo SDK**: `~57.0.22`
- **React Native**: `^0.86.3`
- **React**: `19.2.3`
- **Expo Router**: `~57.0.21` (file-based routing with typed routes)
- **TypeScript**: `~6.0.3`

### State Management & Styling
- **Zustand**: `^5.0.6` (authentication store & shopping cart store)
- **NativeWind**: `^4.1.23` with **Tailwind CSS** `^3.4.17`
- **clsx**: `^2.1.1` (conditional class name composition)
- **use-debounce**: `^10.0.5` (debounced search queries)

### Backend & Cloud Services (Appwrite)
- **Appwrite SDK**: `react-native-appwrite` (`^0.10.0`) & `node-appwrite` (`^17.0.0` in Cloud Function)
- **Appwrite Auth**: Email/Password session management
- **Appwrite Databases**: Relational/document storage for users, categories, menu items, customizations, and orders
- **Appwrite Storage**: Cloud asset bucket (`assets`) for menu item images
- **Appwrite Functions**: Node.js serverless function (`payments-with-stripe`) for Stripe Checkout & Webhooks

### Payments & Observability
- **Stripe**: `stripe` (`^17.7.0`) Checkout Sessions & Webhook signature verification
- **Sentry**: `@sentry/react-native` (`~7.11.0`) error monitoring and mobile replay integration

---

## Deployment

### Live Application URL
- **App Live URL**: (APP URL)

### Backend & Serverless Endpoints
- **Appwrite Cloud Endpoint**: `https://fra.cloud.appwrite.io/v1`
- **Stripe Payment Function URL**: `https://payments-with-stripe.fra.appwrite.run/`
- **Stripe Webhook Endpoint**: `https://payments-with-stripe.fra.appwrite.run/webhook`
- **Deep Link Scheme**: `fastfood://` (`fastfood://payment-result`)

---

## Test and Admin Users Credentials

### Regular Test User Credentials
Use the following test account to sign in to the mobile app, or register a new account directly from the **Sign Up** screen:

| Field | Value |
| :--- | :--- |
| **Email** | `testuser@example.com` |
| **Password** | `Test@123456` |
| **Role** | Regular Customer (`any` / authenticated Appwrite session) |

### Admin User Credentials
Admin operations (managing collections, storage buckets, functions, and orders) are performed via the **Appwrite Console** or **Appwrite CLI**:

| Field | Value |
| :--- | :--- |
| **Console URL** | `https://cloud.appwrite.io/console/project-6a9ed480003c0d80abd9` |
| **Admin Email** | `<YOUR_APPWRITE_ADMIN_EMAIL>` |
| **Admin Password** | `<YOUR_APPWRITE_ADMIN_PASSWORD>` |
| **Project ID** | `6a9ed480003c0d80abd9` |

---

## How to Use App for Regular User

### 1. Sign Up or Sign In
1. Launch the app. If you do not have an active session, you will be directed to the **Sign In** screen.
2. Enter the [Regular Test User Credentials](#regular-test-user-credentials) and tap **Sign In**, or tap **Sign Up** to create a new account with your full name, email, and password.

### 2. Browse Offers on the Home Tab
1. After signing in, land on the **Home** tab.
2. Browse featured promotional cards (`SUMMER COMBO`, `BURGER BASH`, `PIZZA PARTY`, `BURRITO DELIGHT`) and check your active delivery location in the header.
3. Tap the cart icon in the top-right corner at any time to jump to your cart.

### 3. Search and Filter Menu Items
1. Switch to the **Search** tab from the bottom navigation bar.
2. Use the search bar to filter items by name (e.g., `"Burger"`, `"Pizza"`, `"Wrap"`).
3. Tap any category chip (`All`, `Burgers`, `Pizzas`, `Burritos`, `Sandwiches`, `Wraps`, `Bowls`) to filter menu items by category.
4. Tap **Add to Cart +** on any `MenuCard` to add the dish to your cart.

### 4. Manage Your Cart
1. Open the **Cart** tab from the bottom navigation bar.
2. Use the `+` and `-` buttons next to any item to adjust quantities, or tap the trash icon to remove the item completely.
3. Review the **Payment Summary** showing the Subtotal, Delivery Fee (`$5.00`), Discount (`-$0.50`), and Total.

### 5. Complete Checkout with Stripe
1. Tap **Order Now** at the bottom of the Cart screen.
2. A secure Stripe Checkout session opens in the system browser.
3. Enter test card details (e.g., Stripe test card `4242 4242 4242 4242`, any future expiry date, any 3-digit CVC) and submit payment.
4. Upon completion, Stripe redirects back into the app (`fastfood://payment-result?status=success`), your cart clears automatically, and an order confirmation alert is displayed.

### 6. View Profile & Sign Out
1. Navigate to the **Profile** tab to inspect your generated avatar, display name, email address, and delivery location.
2. Tap **Sign Out** to end your current Appwrite session and return to the **Sign In** screen.

---

## How to Use App for Admin User

### 1. Access the Appwrite Console
1. Sign in to the [Appwrite Console](https://cloud.appwrite.io/console) using the [Admin User Credentials](#admin-user-credentials), or authenticate locally via the Appwrite CLI:
   ```bash
   appwrite login
   ```

### 2. Seed or Reset Menu & Category Data
1. Ensure `.env` is configured at the root of the project with your Appwrite Project, Database, Collection, and Bucket IDs.
2. Run the Node.js seeding script to clear existing documents, upload menu images from `lib/data.ts` to Appwrite Storage, and populate Categories, Customizations, Menu Items, and Menu-Customization links:
   ```bash
   node scripts/seed.mjs
   ```

### 3. Manage Menu Items, Categories & Customizations
1. In the Appwrite Console, open **Databases** → Database `6a9ee9530025d5f59656`.
2. Add, edit, or remove documents in:
   - **Categories** (`6a9ef78f002c785fb5de`)
   - **Menu** (`6a9ef99d000d3ce2e634`)
   - **Customizations** (`6a9f04010021d685c8f8`)
   - **Menu Customizations** (`6a9f11d20034a261e6d9`)
3. Changes immediately reflect in the mobile app's **Search** tab and server-side checkout pricing.

### 4. Manage Storage Assets
1. Open **Storage** → Bucket `assets` (`6a9f16010017e0e997a3`).
2. Upload new product PNG images or inspect existing files.
3. Copy the file's View URL and assign it to the `image_url` attribute of the corresponding document in the `menu` collection.

### 5. Monitor Orders & Stripe Webhook Executions
1. Open **Functions** → `payments-with-stripe` (`6aa6df40000714811c5b`) to inspect execution logs for `/checkout`, `/success`, `/cancel`, and `/webhook`.
2. Verify recorded customer orders in the `orders` collection populated when Stripe fires `checkout.session.completed`.

---

## Getting Started

### Prerequisites
- **Node.js** `>= 18.x` and **npm**
- **Expo CLI** / **Expo Go** (or Android Studio / Xcode for native simulators)
- **Appwrite CLI** (optional, for managing backend resources and functions)
- An **Appwrite Cloud** (or self-hosted) project and a **Stripe** account

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd react-native-food_ordering
   ```
2. Install project dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment file and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

### Running the App
Start the Expo development server:
```bash
npm start
```
Or launch directly on a target platform:
```bash
npm run android   # Launch on Android emulator / device
npm run ios       # Launch on iOS simulator / device
npm run web       # Launch in web browser
```

---

## Environment Variables

### Client Environment Variables (`.env`)
| Variable | Description |
| :--- | :--- |
| `EXPO_PUBLIC_APPWRITE_PROJECT_ID` | Appwrite Project ID |
| `EXPO_PUBLIC_APPWRITE_ENDPOINT` | Appwrite API Endpoint (e.g., `https://fra.cloud.appwrite.io/v1`) |
| `EXPO_PUBLIC_APPWRITE_PLATFORM` | Registered Appwrite platform bundle ID (`com.ti.foodordering`) |
| `EXPO_PUBLIC_APPWRITE_DATABASE_ID` | Appwrite Database ID |
| `EXPO_PUBLIC_APPWRITE_BUCKET_ID` | Appwrite Storage Bucket ID for food images |
| `EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID` | Collection ID for user profiles |
| `EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID` | Collection ID for food categories |
| `EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID` | Collection ID for menu items |
| `EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID` | Collection ID for toppings and sides |
| `EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID` | Collection ID linking menu items and customizations |
| `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (`pk_test_...`) |
| `EXPO_PUBLIC_APPWRITE_STRIPE_FUNCTION_ID` | Appwrite Function ID for `payments-with-stripe` |

### Serverless Function Environment Variables
Configure these variables in **Appwrite Console → Functions → `payments-with-stripe` → Settings → Environment Variables**:

| Variable | Description |
| :--- | :--- |
| `STRIPE_SECRET_KEY` | Stripe secret API key (`sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (`whsec_...`) |
| `FUNCTION_PUBLIC_URL` | Public domain of the Appwrite Function |
| `APPWRITE_DATABASE_ID` | Database ID storing orders and menu collections |
| `APPWRITE_COLLECTION_ID` | Orders collection ID |
| `MENU_DATABASE_ID` | Database ID containing menu & customizations (defaults to `APPWRITE_DATABASE_ID`) |
| `MENU_COLLECTION_ID` | Menu collection ID used to verify item prices on the server |
| `CUSTOMIZATIONS_COLLECTION_ID` | Customizations collection ID used to verify addon prices |

---

## Appwrite Backend Architecture

### Database Collections
- **`user` (`6a9eea8b001aec8cf9e1`)**: Stores `name`, `email`, `accountId`, and `avatar`.
- **`categories` (`6a9ef78f002c785fb5de`)**: Stores category `name` and `description`.
- **`menu` (`6a9ef99d000d3ce2e634`)**: Stores `name`, `description`, `image_url`, `price`, `rating`, `calorie`, `protein`, and relation `categories`.
- **`customizations` (`6a9f04010021d685c8f8`)**: Stores `name`, `price`, and `type` (`topping` | `side`).
- **`menu_customizations` (`6a9f11d20034a261e6d9`)**: Junction collection linking `menu` documents to `customizations` documents.

### Storage Bucket
- **`assets` (`6a9f16010017e0e997a3`)**: Public read-enabled bucket storing PNG images for all menu items.

### Stripe Payment Appwrite Function
Located in `functions/payments-with-stripe/`:
- `POST /checkout`: Authenticates the caller via `x-appwrite-user-id`, looks up authoritative menu & customization prices from Appwrite Databases, adds the delivery fee (`$5.00` minus `$0.50` discount), and returns a Stripe Checkout Session URL.
- `GET /success` & `GET /cancel`: Validates the app redirect URL (`fastfood://payment-result`) and redirects the user back into the mobile app with `?status=success` or `?status=cancel`.
- `POST /webhook`: Validates the Stripe signature and creates an order document upon `checkout.session.completed`.

---

## Project Structure

```text
react-native-food_ordering/
├── app/
│   ├── (auth)/
│   │   ├── _layout.tsx          # Auth stack layout & redirect guard
│   │   ├── sign-in.tsx          # Email/password Sign In screen
│   │   └── sign-up.tsx          # User registration screen
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Bottom tab navigation layout
│   │   ├── index.tsx            # Home screen with promotional offers
│   │   ├── search.tsx           # Search & category filtering screen
│   │   ├── cart.tsx             # Cart management & Stripe checkout trigger
│   │   └── profile.tsx          # User profile & sign-out screen
│   ├── _layout.tsx              # Root layout (fonts, Sentry, auth bootstrap)
│   ├── globals.css              # Tailwind / NativeWind utility classes
│   └── payment-result.tsx       # Deep-link landing route for Stripe return
├── assets/
│   ├── fonts/                   # Quicksand font family files
│   ├── icons/                   # UI icons
│   └── images/                  # Static illustrations and offer images
├── components/
│   ├── CartButton.tsx           # Header cart button with item count badge
│   ├── CartItem.tsx             # Individual cart row with +/- controls
│   ├── CustomButton.tsx         # Reusable button with loading state
│   ├── CustomHeader.tsx         # Screen header component
│   ├── CustomInput.tsx          # Styled text input field
│   ├── Filter.tsx               # Horizontal category filter chips
│   ├── MenuCard.tsx             # Product card on the Search tab
│   └── SearchBar.tsx            # Debounced search input bar
├── constants/
│   └── index.ts                 # Static offers and asset mappings
├── functions/
│   └── payments-with-stripe/    # Appwrite Cloud Function for Stripe Checkout
├── lib/
│   ├── appwrite.ts              # Appwrite client, Auth, DB & Function helpers
│   ├── data.ts                  # Seed dataset for categories, customizations & menu
│   ├── seed.ts                  # In-app seed utility
│   └── useAppwrite.ts           # Custom data-fetching hook
├── scripts/
│   └── seed.mjs                 # CLI database & storage seeding script
├── store/
│   ├── auth.store.ts            # Zustand authentication store
│   └── cart.store.ts            # Zustand shopping cart store
├── .env.example                 # Environment variables template
├── app.json                     # Expo configuration
├── package.json                 # Dependencies and scripts
└── tailwind.config.js           # Tailwind / NativeWind configuration
```

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm start` | Start the Expo Metro development server |
| `npm run android` | Start the Expo server and open on Android |
| `npm run ios` | Start the Expo server and open on iOS |
| `npm run web` | Start the Expo server for Web |
| `npm run lint` | Run ESLint via `expo lint` |
| `node scripts/seed.mjs` | Seed Appwrite Databases and Storage with initial menu data |

