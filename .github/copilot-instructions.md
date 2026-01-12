# Copilot Instructions: Portfolio Website

## Architecture Overview

This is a **Cloud Resume Challenge** portfolio built with Next.js 14 (SSG + CloudFront) and AWS serverless services. The project has two distinct layers:

### Frontend (Next.js + Static Export)
- **Location**: `src/app/` - Single-page portfolio built with Next.js App Router
- **Styling**: Tailwind CSS with custom color palette (see `tailwind.config.ts` for `customGray`, `btnBlue`, etc.)
- **Key Pattern**: All pages are **static-generated** for S3 hosting (no dynamic server routes)
- **Font**: Montserrat via Google Fonts (configured in `layout.tsx`)
- **Navigation**: Smooth scroll anchors (e.g., `#Hero.`, `#Projects.`, `#Contact.`) - note the trailing period is intentional

### Backend (AWS Lambda + SES)
- **Location**: `lambda/contact-handler/index.mjs` - Node.js handler for contact form
- **Service Integration**: Receives POST requests from contact form, sends emails via AWS SES
- **Region**: `ap-northeast-1` (Tokyo) configured in Lambda handler
- **Email Setup**: Uses verified SES sender (`taecooo512@gmail.com`) - production changes require SES account configuration

## Critical Patterns & Conventions

### Client Components ("use client")
- Contact form (`Contact.tsx`) uses client-side state with `"use client"` directive
- Reason: Requires user interaction (form submission, loading states, validation)
- Pattern: `useState` for form state, confirmation dialog via `window.confirm()`, error handling with `alert()`

### Component Structure
- All components are `.tsx` functional components with `React.FC` type
- Section IDs must match navigation links (e.g., `id="Contact."` for `#Contact.` link)
- Responsive classes follow pattern: `sm:` for small screens, `lg:` for large
- **Data Loading**: ProjectsSection and related sections use hardcoded data arrays (no API calls) - this is by design for static generation

### Styling Conventions
- **Custom Colors**: Defined in `tailwind.config.ts` - always use `customGray` (#0f0f0f), `customLightGray` (#595959), `btnBlue` (#1e90ff)
- **Responsive Grid**: Hero and project sections use `grid-cols-1 lg:grid-cols-12` pattern
- **Animations**: `fadeLeft` class used for entrance animations (defined in globals.css)
- **Container**: Main layout wraps components in `container mx-auto px-auto py-5` with top margin offset for fixed navbar

### API Integration Pattern
- Frontend Contact form POSTs to `/api/send` endpoint (serverless AWS API Gateway)
- Request body: `{ email, subject, message }` (JSON stringified)
- Response: Status 200 with success message, or error status with alert
- CORS handled by Lambda function - allows all origins (should be restricted in production)

## Build & Deployment

### Local Development
```bash
npm install
npm run dev  # Starts at http://localhost:3000
```

### Production Build
```bash
npm run build  # Generates static export for S3
```

### AWS Deployment
- **Static Frontend**: S3 bucket + CloudFront CDN
- **Lambda Deployment**: Package `lambda/contact-handler/` with `npm install`, zip with dependencies, deploy via AWS console
- **Configuration**: Lambda needs IAM role with SES permissions; API Gateway endpoint URL goes in `.env.local` as `NEXT_PUBLIC_API_ENDPOINT`

## Dependencies & External Services

### Key Packages
- **@fortawesome/react-fontawesome**: Icon library (LinkedIn, GitHub social links)
- **@heroicons/react**: UI icons (menu hamburger, close icons)
- **react-spinners**: Loading spinner (ClipLoader) in contact form
- **resend**: Email service SDK (imported but not currently used - SES is active)
- **rss-parser**: RSS feed parsing (commented out in page.tsx but framework exists for NewsSection)

### AWS Integration Points
1. **SES** - Email delivery from Lambda
2. **S3** - Static site hosting (Next.js static export)
3. **CloudFront** - HTTPS, CDN, caching
4. **API Gateway** - REST endpoint for contact form
5. **Route 53** - DNS (external domain management)

## Important Notes for Development

1. **No Server-Side Rendering**: Don't add `getServerSideProps` or dynamic routes - this breaks the SSG model required for S3 deployment
2. **Section IDs Must Match Routes**: Every section needs matching navigation anchor (check `menuItems` in `Navbar.tsx`)
3. **Static Data**: Project list, news, about content are all data arrays - no database queries
4. **Form Validation**: Contact form validates email and required fields client-side; Lambda does server-side validation
5. **Environment Variables**: Only `NEXT_PUBLIC_` prefixed variables are available in browser; Lambda endpoint must be public
6. **TypeScript Strict**: Project uses `strict: true` in tsconfig - all components must be properly typed

## Files to Modify for Common Tasks

| Task | File(s) |
|------|---------|
| Add navigation link | `Navbar.tsx` (menuItems array) + corresponding new section |
| Update project portfolio | `ProjectsSection.tsx` (projects array) + `/public/images/` |
| Change color scheme | `tailwind.config.ts` (theme.extend.colors) + `globals.css` |
| Add RSS news source | `NewsSection.tsx` + `rss-parser` implementation |
| Update contact email recipient | `lambda/contact-handler/index.mjs` (Destination.ToAddresses) |
| Modify hero content | `HeroSection.tsx` |
| Update social links | `HeroSection.tsx` or `Footer.tsx` (FontAwesome icons) |

## Debugging Tips

- **Contact form fails silently**: Check `NEXT_PUBLIC_API_ENDPOINT` in `.env.local` and Lambda CloudWatch logs
- **Styles not applying**: Verify custom color names in `tailwind.config.ts` match usage
- **Smooth scroll not working**: Ensure HTML tag has `scroll-smooth` class (set in `layout.tsx`)
- **Build fails**: Ensure all components are properly typed (strict mode) and no server-only code in client components
