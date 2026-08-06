# NEO-SHIELD — Cyber Security Suite

> **NEO-SHIELD** is a premium, full-stack cybersecurity SaaS application providing end-to-end digital security across four core vectors: WireGuard VPN, Dark Web Identity Theft Monitoring, Real-Time AI Behavioral Malware Defense, and Heuristic Antivirus Protection. 

Designed for high-conversion self-service customer acquisition, NEO-SHIELD features a streamlined recurring subscription engine (Monthly & Yearly billing) supporting three distinct pricing tiers: **Basic Shield**, **Pro Defense**, and **Family Vault**.

---

## 📸 Screenshots

> **Note:**  
> Create a folder named `./screenshots/` in the root directory of your project and place your actual interface images using the filenames listed below.

### 1. Hero & Quad-Protection Landing Page
![Landing Page](./screenshots/landing.png)
*Place screenshot of the main landing page, hero section, and security live defense indicator at `./screenshots/landing.png`*

### 2. User Security Dashboard
![User Dashboard](./screenshots/dashboard.png)
*Place screenshot of the main user dashboard with the dynamic security score gauge and protection module controls at `./screenshots/dashboard.png`*

### 3. Interactive Risk Calculator & Threat Simulator
![Risk Calculator](./screenshots/calculator.png)
*Place screenshot of the interactive risk assessment calculator at `./screenshots/calculator.png`*

### 4. Subscription & Billing Tier Management
![Pricing & Subscriptions](./screenshots/pricing.png)
*Place screenshot of the pricing cards and Stripe subscription checkout integration at `./screenshots/pricing.png`*

---

## ✨ Features

- **Quad-Vector Security Shield**:
  - **WireGuard VPN**: High-speed global server endpoints, diskless zero-log nodes, double-NAT architecture, and automatic Kill Switch protection.
  - **Dark Web Identity Theft Monitoring**: 24/7 dark web database surveillance for leaked credentials, emails, and SSNs.
  - **AI Behavioral Malware Defense**: Real-time process memory inspection for zero-day ransomware interception.
  - **Heuristic Antivirus**: Automated file scanning, web download guard, and isolated quarantine vault.

- **Subscription & Monetization Engine**:
  - **3 Tier Architecture**: Basic Shield, Pro Defense, and Family Vault.
  - **Flexible Billing Cycles**: Monthly & Discounted Yearly subscription toggles.
  - **Stripe Integration**: Automated Stripe Checkout sessions, self-service customer billing portal, and lifecycle webhook listeners (`checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`).

- **Interactive User Dashboard**:
  - **Dynamic Security Score Gauge**: Real-time calculated score based on active protection modules and breach status.
  - **Interactive Modal Controllers**: Server location selector, dark web breach scanner, deep file scanner, and 128-bit military password generator.
  - **Billing & Account Management**: Invoice history, active plan overview, and tier upgrade/downgrade workflows.

- **Authentication & Security**:
  - Supabase Authentication (Email/Password & Social OAuth support).
  - Instant demo access mode for friction-free buyer inspection.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router) / React 19 + TypeScript
- **Styling & UI**: Tailwind CSS, shadcn/ui components, Lucide Icons
- **Animations**: Framer Motion (`motion/react`)
- **Backend & API**: Next.js Route Handlers / Express server middleware
- **Database & Authentication**: Supabase (`@supabase/supabase-js`)
- **Payments & Billing**: Stripe Node SDK & Stripe Checkout / Customer Portal

---

## 📁 Project Structure

```
├── public/                      # Static assets and icons
├── screenshots/                 # Place your project screenshots here
├── src/
│   ├── components/              # Modular UI components
│   │   ├── auth/                # Supabase authentication modals & state
│   │   ├── common/              # Shared modals, skeletons, and UI widgets
│   │   ├── dashboard/           # Dashboard overview, VPN modal, scanner, billing
│   │   ├── landing/             # Hero, Protections, Pricing, Calculator, FAQ
│   │   └── layout/              # Responsive Navbar and Footer
│   ├── context/                 # AuthContext and Toast notification state
│   ├── data/                    # Pricing tiers, VPN endpoints, and security datasets
│   ├── lib/                     # Supabase & Stripe SDK client initializations
│   ├── types.ts                 # TypeScript interfaces and type definitions
│   ├── App.tsx                  # Main application router
│   └── main.tsx                 # React DOM mount point
├── server.ts                    # Backend API server & Stripe Webhook endpoint
├── .env.example                 # Template for required environment variables
├── package.json                 # Project dependencies and deployment scripts
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** or **pnpm**
- **Supabase Account**: For database and auth
- **Stripe Account**: For subscription billing

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/neo-shield.git
   cd neo-shield
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local` (or `.env`):
   ```bash
   cp .env.example .env
   ```

4. **Run the local development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

---

## 🔑 Environment Variables

Make sure to populate your `.env` file with the following environment variables:

```env
# APP CONFIGURATION
APP_URL="http://localhost:3000"

# SUPABASE CREDENTIALS (Supabase Dashboard -> Project Settings -> API)
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# STRIPE API KEYS (Stripe Dashboard -> Developers -> API Keys)
STRIPE_SECRET_KEY="sk_test_..."
VITE_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# STRIPE SUBSCRIPTION PRICE IDs (Basic, Pro, Family)
STRIPE_PRICE_BASIC_MONTHLY="price_basic_monthly_id"
STRIPE_PRICE_BASIC_YEARLY="price_basic_yearly_id"
STRIPE_PRICE_PRO_MONTHLY="price_pro_monthly_id"
STRIPE_PRICE_PRO_YEARLY="price_pro_yearly_id"
STRIPE_PRICE_FAMILY_MONTHLY="price_family_monthly_id"
STRIPE_PRICE_FAMILY_YEARLY="price_family_yearly_id"

# OPTIONAL ASSISTANT / AI INSIGHTS
GEMINI_API_KEY="your-gemini-api-key"
```

---

## 💳 Stripe Setup Notes

To complete the Stripe integration:

1. **Create Subscription Products**:
   In your [Stripe Dashboard](https://dashboard.stripe.com), create three recurring products:
   - **Basic Shield**: Create 1 Monthly Price ($4.99/mo) and 1 Yearly Price ($49.99/yr).
   - **Pro Defense**: Create 1 Monthly Price ($9.99/mo) and 1 Yearly Price ($99.99/yr).
   - **Family Vault**: Create 1 Monthly Price ($17.99/mo) and 1 Yearly Price ($179.99/yr).

2. **Configure Price IDs**:
   Copy each corresponding Price ID (`price_...`) from Stripe into your `.env` variables listed above.

3. **Set Up Local Webhook Forwarding (Optional for Development)**:
   Install the Stripe CLI and forward webhooks to your local dev environment:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   Copy the outputted Webhook Signing Secret (`whsec_...`) into `STRIPE_WEBHOOK_SECRET`.

---

## 🌐 Deployment

### Deploying to Vercel

1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Log in to your [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import your **NEO-SHIELD** repository.
4. Add all required **Environment Variables** in the Vercel project settings:
   - Set `APP_URL` to your production domain (e.g. `https://neo-shield.vercel.app`).
   - Add Supabase credentials (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
   - Add Stripe API keys and Price IDs.
5. Click **Deploy**. Vercel will build and host your application automatically.

---

*© 2026 NEO-SHIELD Security Systems. All Rights Reserved.*
