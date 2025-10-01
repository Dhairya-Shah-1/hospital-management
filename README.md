This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Hospital Management System - Next.js Project
The application demonstrates modern React patterns, professional UI/UX, and scalable architecture suitable for a production hospital management system.

## Setup Instructions

1. Create a new Next.js project:
bash
npx create-next-app@latest hospital-management --typescript --eslint --app --use-npm
cd hospital-management


2. Install dependencies:
bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled @reduxjs/toolkit react-redux react-hook-form axios @mui/x-date-pickers dayjs react-toastify


3. Replace the default files with the code below.

## File Structure

hospital-management/
├── __tests__/
│   ├── components/PatientForm.test.js
│   └── pages/login.test.js
├── public/
│   ├── favicon.ico
│   └── logo.png
├── src/
│   ├── app/
│   │   ├── auth/login/page.js
│   │   ├── dashboard/
│   │   │   ├── appointments/page.js
│   │   │   ├── doctors/page.js
│   │   │   ├── patients/page.js
│   │   │   ├── schedule/page.js
│   │   │   ├── layout.js
│   │   │   └── page.js
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   │   ├── forms/
│   │   │   ├── AppointmentForm.js
│   │   │   └── PatientForm.js
│   │   ├── layout/
│   │   │   ├── Header.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── Sidebar.js
│   │   └── ui/
│   │       ├── DataTable.js
│   │       ├── LazyComponents.js
│   │       ├── Pagination.js
│   │       └── SearchField.js
│   ├── hooks/
│   │   ├── useApi.js
│   │   ├── useAuth.js
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   └── lib/
│       ├── api/
│       │   ├── axios.js
│       │   ├── mockApi.js
│       │   └── services.js
│       ├── store/
│       │   ├── slices
│       │   │   ├── appointmentsSlice.js
│       │   │   ├── authSlice.js
│       │   │   ├── doctorsSlice.js
│       │   │   └── patientsSlice.js
│       │   ├── index.js
│       │   └── prorvider.js
│       └── utils.js
├── .eslintrc.
├── .gitignore
├── .prettierrc
├── jest.config.js
├── jest.setup.js
├── middleware.js
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── render.yaml
└── tsconfig.json

## Getting Started

1. Follow setup instructions above

2. Run npm run dev

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. Use demo credentials to login

5. Explore the hospital management features

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.