# PenFlare 📝✨

**A Modern Article Publishing Platform Built with Next.js**

PenFlare is a sleek, high-performance article publishing application that enables content creators to easily share their thoughts with the world. Built with Next.js and TypeScript, powered by PostgreSQL on Neon's serverless database platform, and styled with TailwindCSS, PenFlare delivers a seamless writing and reading experience.

Try it out: [PenFlare App](https://your-penflare-app.vercel.app)

## ✨ Features

- **Intuitive Content Creation** – Write and format articles with a user-friendly editor
- **Responsive Design** – Optimized viewing experience across all device sizes
- **Server-Side Rendering** – Fast page loads and improved SEO
- **Authentication** – Secure user accounts and content management
- **Comment System** – Engage with readers through interactive discussions
- **Article Categories** – Organize content for better discovery
- **Dark/Light Mode** – Comfortable reading experience in any environment
- **Serverless Architecture** – Scales automatically with usage

## 🛠️ Technology Stack

### Core Technologies
- **[Next.js](https://nextjs.org/)** – React framework for production-grade applications
- **[TypeScript](https://www.typescriptlang.org/)** – Type-safe code for better developer experience
- **[PostgreSQL](https://www.postgresql.org/)** – Robust relational database
- **[Neon](https://neon.tech/)** – Serverless PostgreSQL for modern applications
- **[TailwindCSS](https://tailwindcss.com/)** – Utility-first CSS framework
- **[Vercel](https://vercel.com/)** – Deployment and hosting platform

### Development Tools
- **Git & GitHub** – Version control and collaborative development
- **npm/yarn** – Package management
- **ESLint & Prettier** – Code quality and formatting

## 📸 Screenshots

<!-- Add screenshots of your application here -->
<table>
  <tr>
    <td><img src="public/screenshots/HomePage.png" alt="Homepage" width="100%"></td>
    <td><img src="public/screenshots/Posts.png" alt="Posts" width="100%"></td>
  </tr>
  <tr>
    <td align="center"><b>Homepage</b></td>
    <td align="center"><b>Penflare Articles</b></td>
  </tr>
  <tr>
    <td><img src="public/screenshots/NewArticle.png" alt="Article Editor" width="100%"></td>
    <td><img src="public/screenshots/Contact.png" alt="Mobile View" width="100%"></td>
  </tr>
  <tr>
    <td align="center"><b>Adding New Article</b></td>
    <td align="center"><b>Contact Page</b></td>
  </tr>
</table>

## 🚀 How It Works

1. **User Authentication** – Sign up/Login to your account
2. **Create Content** – Write and publish articles using our rich text editor
3. **Discover Articles** – Browse through categories or search for specific topics
4. **Engage with Community** – Comment on articles and follow your favorite authors
5. **Manage Your Content** – Edit or delete your published articles

### Technical Implementation
- **App Router** – Leverages Next.js 13+ App Router for improved routing and layouts
- **Server Components** – Utilizes React Server Components for optimized rendering
- **API Routes** – RESTful API endpoints for client-server communication
- **Database Integration** – Prisma ORM for type-safe database access
- **Responsive Design** – Mobile-first approach with TailwindCSS
- **SEO Optimization** – Meta tags and structured data for better search engine visibility

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (16.x or higher)
- npm/pnpm or yarn
- PostgreSQL database (or Neon account)
- Git

### Getting Started

```bash
# Clone the repository
git clone https://github.com/YourUsername/penflare.git

# Navigate to the project directory
cd penflare

# Install dependencies
pnpm install
# or
yarn install

# Set up environment variables
# Create a .env.local file with the following variables:
# DATABASE_URL=your_neon_postgres_url
# NEXTAUTH_SECRET=your_auth_secret
# NEXTAUTH_URL=http://localhost:3000

# Run the development server
pnpm run dev
# or
yarn dev

# Open http://localhost:3000 with your browser to see the result
```

### Folder Structure
```
penflare/
│── app/
│   │── api/
│   │── auth/
│   │── blog/
│   │── lib/
│   │── ui/
│   │── layout.tsx
│   └── page.tsx
├── public/
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── LICENCE.txt
└── README.md
```

## 📝 Configuration

### Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@hostname:port/database"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Third-party auth providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Optional: Storage (if using cloud storage for images)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

## 🚀 Deployment

The easiest way to deploy your PenFlare app is through Vercel:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure your environment variables
4. Deploy!

```bash
# Build for production
pnpm run build
# or
yarn build

# Locally preview production build
pnpm run start
# or
yarn start
```

## 🔄 CI/CD Pipeline

This project uses GitHub Actions for continuous integration and Vercel for continuous deployment:

- **Pull Request Checks** – Automated testing and linting
- **Preview Deployments** – Each PR gets a preview deployment
- **Production Deployment** – Automatic deployment on merges to main branch

## 🛣️ Roadmap

- [ ] **Enhanced Editor** – Support for markdown and more formatting options
- [ ] **Analytics Dashboard** – View article performance and reader engagement
- [ ] **Subscription Model** – Premium content and subscription management
- [ ] **Notifications** – Real-time updates for comments and followers
- [ ] **Social Features** – Share articles directly to social media platforms
- [ ] **Mobile App** – Companion app for iOS and Android

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For any questions or feedback, feel free to reach out:

- Mobile: [+94719607296](tel:+94719607296)
- Email: [lhlahiru95@gmail.com](mailto:lhlahiru95@gmail.com)
- LinkedIn: [LahiruLiyanage](https://www.linkedin.com/in/liyanage-lahiru/)
- GitHub: [@LahiruLiyanage](https://github.com/LahiruLiyanage)
- WebSite: [lahiruliyanage.com](www.lahiruliyanage.com)

## 🔗 Share your thoughts with PenFlare! 📝✨

---

Built with ❤️ using Next.js, TypeScript, and PostgreSQL