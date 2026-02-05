# Modhus - YouTube for AI Models

A beautiful, modern landing page with waitlist functionality for Modhus - the user-facing Hugging Face platform.

## Features

- 🎨 Modern, responsive design with dark mode support
- 📧 Waitlist signup with email validation
- ⚡ Built with Next.js 14 and TypeScript
- 🎭 Tailwind CSS for styling
- 📱 Mobile-first approach
- 🚀 Optimized for performance
- ♿ Accessible components

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
modhusweb/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts       # Waitlist API endpoint
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Customization

### Changing Colors

Edit the color scheme in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Adding Database Integration

The current waitlist uses in-memory storage. To add database support:

1. Install your preferred database client (e.g., Prisma, MongoDB)
2. Update `app/api/waitlist/route.ts` to save to database
3. Add database connection string to `.env`

### Email Integration

To send confirmation emails:

1. Choose an email service (SendGrid, Resend, etc.)
2. Install the SDK
3. Add email sending logic in the API route
4. Add API keys to `.env`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Deploy with one click

### Deploy to Other Platforms

Build the production version:

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file for your environment variables:

```env
# Add your variables here
DATABASE_URL=
SENDGRID_API_KEY=
```

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Roadmap

- [ ] Add database integration
- [ ] Email confirmation system
- [ ] Admin dashboard for managing waitlist
- [ ] Analytics integration
- [ ] A/B testing for landing page
- [ ] Blog section
- [ ] Community forum

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For support, email [your-email] or join our community Discord.

---

Built with ❤️ by the Modhus team
