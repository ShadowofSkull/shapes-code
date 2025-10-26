# 🎨 Favorite Shapes - Full Stack Application

A web application for managing and displaying favorite shapes with real-time updates for ALPHV internship assignment.

## 🚀 Features

- ✨ **User Portal**: Public view with real-time shape updates
- 🔐 **Admin Portal**: Secure dashboard for CRUD operations
- 🎨 **Playful Design**: Floating background shapes with animations
- 📊 **Pagination**: Server-side pagination (10 items per page)
- 🔄 **Real-time Updates**: SWR polling every 5 seconds
- 🛡️ **Authentication**: NextAuth.js with JWT sessions
- ✅ **Validation**: Client and server-side with Zod
- 📱 **Responsive**: Mobile-first design with Tailwind CSS

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: MySQL 8.0+ with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR
- **Validation**: Zod
- **Icons**: Lucide React

## 🛠️ Installation

### Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm

### Step 1: Clone and Install
```bash
# Install dependencies
npm install
```

### Step 2: Environment Setup

Rename `.env.example` to `.env` and change the `<password>` to your MySQL root account's password:
```env
DATABASE_URL="mysql://root:<password>@localhost:3306/shapes_db"
NEXTAUTH_SECRET="UsJiWAdUo0mYtqfTEw/KDLn/lj/s88tkhZx8wUyDgTY="
NEXTAUTH_URL="http://localhost:3000"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
```

Generate secret:
```bash
openssl rand -base64 32
```
*For **NEXTUAUTH_SECRET** but can just use the provided value*

### Step 3: Database Setup
```bash
# Create database
mysql -u root -p
CREATE DATABASE shapes_db;
EXIT;

# Initialize Prisma
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database
npx prisma db seed
```

### Step 4: Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## 📂 Project Structure
```
favorite-shapes/
├── app/
│   ├── api/              # API routes
│   ├── admin/            # Admin portal
│   ├── page.tsx          # User portal
│   └── layout.tsx
├── components/
│   ├── admin/            # Admin components
│   ├── user/             # User components
│   └── shared/           # Shared components
├── lib/
│   ├── db.ts             # Prisma client
│   ├── auth.ts           # NextAuth config
│   ├── validations.ts    # Zod schemas
│   └── utils.ts          # Utilities
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed script
└── middleware.ts         # Route protection
```

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/shapes?page=1&limit=10` | Get paginated shapes | No |
| POST | `/api/shapes` | Create shape | Yes |
| PUT | `/api/shapes/[id]` | Update shape | Yes |
| DELETE | `/api/shapes/[id]` | Delete shape | Yes |


## 🎨 Timestamp Format

Displays as: `"HH:MM:SS YYYY-MM-DD"`

Example: `"14:23:45 2025-10-21"`

## 🔒 Default Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`


## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test connection
npx prisma db pull

# Reset database
npx prisma migrate reset
```

### NextAuth Issues
```bash
# Clear cookies and restart
# Check NEXTAUTH_URL matches your domain
```





