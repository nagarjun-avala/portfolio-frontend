# 🚀 Portfolio Frontend

The modern, responsive frontend for the Dynamic Portfolio, built with **Next.js 14**, **Tailwind CSS**, and **TypeScript**. This application delivers a premium user experience with smooth animations, dynamic content fetching, and a comprehensive admin interface.

## ✨ Features

- **Next.js App Router**: Utilizing React Server Components for optimal performance and SEO.
- **Modern UI/UX**: Built with **Tailwind CSS** and **ShadCN/UI** for a polished, accessible design.
- **Animations**: Rich interactions powered by **Framer Motion**.
- **Admin Dashboard**: Secure interface for managing portfolio content (projects, blog, skills).
- **Responsive Design**: Mobile-first architecture ensuring perfect rendering on all devices.
- **Form Handling**: Type-safe forms with **React Hook Form** and **Zod** validation.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN/UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)

## 📁 Project Structure

```bash
web-developer-folio/
├── app/               # Next.js App Router pages and layouts
│   ├── admin/         # Protected admin dashboard routes
│   └── (public)/      # Public facing portfolio pages
├── components/        # Reusable UI components
│   ├── ui/            # Primitive ShadCN components
│   └── ...            # Feature-specific components
├── lib/               # Utility functions and shared logic
├── public/            # Static assets
└── package.json
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **pnpm**
- **Backend Server**: This frontend requires the portfolio server to be running. See the [Server REPO](.https://github.com/nagarjun-avala/web-portfolio-server) for setup instructions.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/nagarjun-avala/nagarjun_avala.git
    cd nagarjun_avala
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_API_URL="http://localhost:5000/api"
    ```
    *Note: Ensure this points to your running backend server.*

### Running the Application

-   **Development Mode**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

-   **Production Build**:
    ```bash
    npm run build
    npm start
    ```

-   **Linting**:
    ```bash
    npm run lint
    ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
