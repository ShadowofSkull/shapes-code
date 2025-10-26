import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        console.log('🔐 Authentication attempt for:', credentials?.username);

        if (!credentials?.username || !credentials?.password) {
          console.log('❌ Missing credentials');
          return null;
        }

        try {
          // Fetch admin from database
          const admin = await prisma.admin.findUnique({
            where: { username: credentials.username as string },
          });

          if (!admin) {
            console.log('❌ Admin not found');
            return null;
          }

          // Verify password
          const isValid = await bcrypt.compare(
            credentials.password as string,
            admin.passwordHash
          );

          if (!isValid) {
            console.log('❌ Invalid password');
            return null;
          }

          console.log('✅ Authentication successful');
          return {
            id: admin.id.toString(),
            name: admin.username,
          };
        } catch (error) {
          console.error('❌ Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
});