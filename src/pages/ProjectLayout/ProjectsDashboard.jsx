import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
const ProjectsDashboard = () => {
  return (
    <div className="p-6 w-full h-screen">
      <div className="search w-full h-16 rounded-lg border px-3 border-gray-300 bg-gray-50 mb-6">
        <div>
          <sub>name</sub>
          <h3 className="text-lg font-[500]">Project Name</h3>
        </div>
      </div>
      <div className="w-full flex gap-3">
        <div className="bg-gray-100 w-1/3 h-[300px] rounded-xl p-3">

          <h3>Task Overview</h3>
          <div className="w-full h-[260px] bg-blue-200 flex items-center justify-center">
  <ResponsiveContainer width={260} height={150}>
    <PieChart>
      <Pie
        data={data}
        cx="50%" // Center dynamically
        cy="100%" // Center dynamically
        startAngle={180}
        endAngle={0}
        innerRadius={110}
        outerRadius={130}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
</div>
        </div>
        {/* <div className="1 h-18 bg-red-300">what you missed</div>
        <div className="2 h-20 bg-red-300">total members</div>
        <div className="3 h-24 bg-red-300">overdue tasks</div>
        <div className="3 h-22 bg-red-300">quick actions</div>
        <div className="3 h-20 bg-red-300">total tasks overview</div> */}
      </div>
    </div>
  );
};

export default ProjectsDashboard;
