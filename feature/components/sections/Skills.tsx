type SkillCategory = {
  title: string;
  items: string[];
};

const categories: SkillCategory[] = [
  {
    title: "Frontend",
    items: ["TypeScript", "React", "Next.js", "JavaScript", "jQuery"],
  },
  {
    title: "Backend",
    items: ["Go", "PHP", "Scala", "C# / .NET", "REST API"],
  },
  {
    title: "AWS / Infrastructure",
    items: [
      "AWS",
      "Terraform",
      "DynamoDB",
      "SNS / SQS / Lambda",
      "MySQL / PostgreSQL",
    ],
  },
  {
    title: "Architecture / Team",
    items: ["Amazon Bedrock", "Cognito", "CQRS", "プロジェクトリード"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="border-t border-border bg-muted-background px-4 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-baseline gap-4">
          <span className="font-mono text-sm font-semibold text-accent">
            02.
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Skills
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
