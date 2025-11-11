import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create NGO-specific templates
  const templates = [
    {
      name: 'Donor Analysis by Source',
      description: 'Analyze donations grouped by source/channel',
      category: 'DONOR_ANALYSIS',
      query: 'Show me total donations grouped by source',
      chartType: 'PIE',
      config: {
        title: 'Donations by Source',
        dataKey: 'amount',
        nameKey: 'source',
      },
    },
    {
      name: 'Monthly Budget vs Actual',
      description: 'Compare budgeted amounts with actual spending',
      category: 'BUDGET_TRACKING',
      query: 'Compare budget vs actual spending by month',
      chartType: 'BAR',
      config: {
        title: 'Budget vs Actual Spending',
        xAxis: 'month',
        yAxis: ['budget', 'actual'],
      },
    },
    {
      name: 'Beneficiaries Reached Over Time',
      description: 'Track number of beneficiaries reached monthly',
      category: 'IMPACT_METRICS',
      query: 'Show beneficiaries reached per month',
      chartType: 'LINE',
      config: {
        title: 'Beneficiaries Reached',
        xAxis: 'month',
        yAxis: 'count',
      },
    },
    {
      name: 'Geographic Distribution',
      description: 'See distribution of projects or beneficiaries by region',
      category: 'GEOGRAPHIC_DISTRIBUTION',
      query: 'Show distribution by region/country',
      chartType: 'MAP',
      config: {
        title: 'Geographic Distribution',
        locationKey: 'region',
        valueKey: 'count',
      },
    },
    {
      name: 'Year-over-Year Comparison',
      description: 'Compare key metrics across years',
      category: 'TREND_ANALYSIS',
      query: 'Compare this year vs last year metrics',
      chartType: 'BAR',
      config: {
        title: 'YoY Comparison',
        xAxis: 'metric',
        yAxis: ['currentYear', 'previousYear'],
      },
    },
    {
      name: 'Top 10 Donors',
      description: 'Identify your largest donors',
      category: 'DONOR_ANALYSIS',
      query: 'Show top 10 donors by total amount',
      chartType: 'BAR',
      config: {
        title: 'Top 10 Donors',
        xAxis: 'donor',
        yAxis: 'amount',
        limit: 10,
      },
    },
    {
      name: 'Expense Categories Breakdown',
      description: 'Analyze spending by category',
      category: 'BUDGET_TRACKING',
      query: 'Show expenses grouped by category',
      chartType: 'DOUGHNUT',
      config: {
        title: 'Expenses by Category',
        dataKey: 'amount',
        nameKey: 'category',
      },
    },
    {
      name: 'Project Completion Status',
      description: 'Overview of project statuses',
      category: 'PROJECT_MONITORING',
      query: 'Count projects by status',
      chartType: 'PIE',
      config: {
        title: 'Projects by Status',
        dataKey: 'count',
        nameKey: 'status',
      },
    },
    {
      name: 'Fundraising Campaign Performance',
      description: 'Compare performance of different campaigns',
      category: 'FUNDRAISING_ANALYTICS',
      query: 'Show fundraising results by campaign',
      chartType: 'BAR',
      config: {
        title: 'Campaign Performance',
        xAxis: 'campaign',
        yAxis: 'raised',
      },
    },
    {
      name: 'Beneficiary Demographics',
      description: 'Understand beneficiary age/gender distribution',
      category: 'BENEFICIARY_TRACKING',
      query: 'Show beneficiary distribution by age group and gender',
      chartType: 'BAR',
      config: {
        title: 'Beneficiary Demographics',
        xAxis: 'ageGroup',
        yAxis: ['male', 'female'],
      },
    },
  ];

  console.log('Creating NGO analysis templates...');
  for (const template of templates) {
    await prisma.template.upsert({
      where: { name: template.name },
      update: {},
      create: template,
    });
  }

  console.log(`✅ Created ${templates.length} templates`);

  // Create a demo user (optional - for testing)
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@ngodemo.org' },
    update: {},
    create: {
      email: 'demo@ngodemo.org',
      password: '$2b$10$YourHashedPasswordHere', // bcrypt hash of 'demo123'
      name: 'Demo User',
      organization: 'Demo NGO',
      role: 'USER',
      isActive: true,
      isVerified: true,
      provider: 'LOCAL',
    },
  });

  console.log(`✅ Created demo user: ${demoUser.email}`);

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
