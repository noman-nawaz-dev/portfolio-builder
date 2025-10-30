import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create templates
  const engineerTemplate = await prisma.template.upsert({
    where: { id: 'engineer-template-id' },
    update: {},
    create: {
      id: 'engineer-template-id',
      name: 'Software Engineer',
      category: 'engineer',
      description: 'Perfect for software developers and engineers. Showcase your technical skills, projects, and experience.',
      previewImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    },
  });

  const marketerTemplate = await prisma.template.upsert({
    where: { id: 'marketer-template-id' },
    update: {},
    create: {
      id: 'marketer-template-id',
      name: 'Marketing Professional',
      category: 'marketer',
      description: 'Ideal for marketing professionals. Highlight your services, case studies, and client success stories.',
      previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    },
  });

  const generalTemplate = await prisma.template.upsert({
    where: { id: 'general-template-id' },
    update: {},
    create: {
      id: 'general-template-id',
      name: 'General Professional',
      category: 'general',
      description: 'A versatile template suitable for any professional. Simple and clean design for all industries.',
      previewImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
    },
  });

  console.log('Seeded templates:', {
    engineerTemplate,
    marketerTemplate,
    generalTemplate,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
