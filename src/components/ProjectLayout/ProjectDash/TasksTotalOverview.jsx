import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 5 },
  { name: "Group B", value: 1 },
  { name: "Group C", value: 1 },
];

const COLORS = ["#FFBB28","#0088FE", "#00C49F" ];
const TasksTotalOverview = () => {
  return (
    <div className="bg-gray-100 w-1/3 h-[290px] rounded-xl p-3">
      <h3 className="text-lg font-[500] ms-1">Total Task Overview</h3>
      <div className="w-full h-[240px] flex flex-col items-center justify-between pt-8">
        <ResponsiveContainer width={260} height={140}>
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* info's */}
        <div className=" w-full h-fit flex items-center justify-center gap-6 mb-3 ms-3">
           <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-[#FFBB28] rounded-full"></div>
            <p className="text-sm">Pending</p>
           </div>
           <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-[#0088FE] rounded-full"></div>
            <p className="text-sm">In progress</p>
           </div>
           <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-[#00C49F] rounded-full"></div>
            <p className="text-sm">Completed</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TasksTotalOverview;
