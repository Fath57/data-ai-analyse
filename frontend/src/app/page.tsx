export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold text-primary-700">
          IA Data Insight
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          AI-Powered Data Analysis for NGOs
        </p>
        <div className="space-x-4">
          <a
            href="/login"
            className="rounded-lg bg-primary px-6 py-3 text-white transition hover:bg-primary-600"
          >
            Get Started
          </a>
          <a
            href="/about"
            className="rounded-lg border border-primary px-6 py-3 text-primary transition hover:bg-primary-50"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="mt-16 grid max-w-4xl grid-cols-1 gap-6 px-4 md:grid-cols-3">
        <FeatureCard
          title="Upload Data"
          description="Import CSV and Excel files easily"
          icon="📊"
        />
        <FeatureCard
          title="Ask Questions"
          description="Query your data in natural language"
          icon="💬"
        />
        <FeatureCard
          title="Get Insights"
          description="Visualize and export your analysis"
          icon="📈"
        />
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg">
      <div className="mb-3 text-4xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
