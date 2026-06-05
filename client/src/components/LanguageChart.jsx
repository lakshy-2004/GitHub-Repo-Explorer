import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0969da', '#e3b341', '#3fb950', '#f78166', '#d2a8ff', '#79c0ff', '#ffa657', '#ff7b72'];

export default function LanguageChart({ repos }) {
  const languageCounts = repos.reduce((acc, repo) => {
    if (!repo.language) return acc;
    acc[repo.language] = (acc[repo.language] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(languageCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  if (data.length === 0) return null;

  return (
    <div className="language-chart">
      <h3>Languages Used</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}