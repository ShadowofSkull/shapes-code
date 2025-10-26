import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
  
  const admin = await prisma.admin.upsert({
    where: { username: process.env.ADMIN_USERNAME || 'admin' },
    update: {},
    create: {
      username: process.env.ADMIN_USERNAME || 'admin',
      passwordHash,
    },
  });

  console.log('✅ Admin user created:', admin.username);

  // Create sample shapes
  const shapes = [
    { name: 'Ali', color: 'red', shape: 'circle' },
    { name: 'Ah kao', color: 'blue', shape: 'square' },
    { name: 'Muthu', color: 'green', shape: 'triangle' },
    { name: 'Mei mei', color: 'yellow', shape: 'circle' },
    
  ];

  for (const shape of shapes) {
    await prisma.shape.create({ data: shape });
  }

  console.log('✅ Sample shapes created');
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });