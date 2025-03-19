import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useStatusSumQuery } from "../../../redux/api/tasksApi";
import { BsQuestionCircle } from "react-icons/bs";

// const demoData = [
//   { name: "pending", value: 1 },
//   { name: "in progress", value: 1 },
//   { name: "completed", value: 1 },
// ];

const COLORS = ["#FFBB28", "#0088FE", "#00C49F"];

const TasksTotalOverview = () => {
  const { tasksInitial } = useSelector((state) => state.tasksSlice);

  const ids = (tasksInitial.allTasks || []).join(",");

  const { data } = useStatusSumQuery(ids);

  return (
    <div className="bg-gray-100 w-1/3 h-[290px] rounded-xl p-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-[500] ms-1">Total Task Overview</h3>
        <div title="this section describes projects total tasks status" className="mr-1 hover:bg-gray-200 duration-300 p-1 rounded-full cursor-pointer">
          <BsQuestionCircle />
        </div>
      </div>
      <div className="w-full h-[240px] flex flex-col items-center justify-between pt-8">
        <ResponsiveContainer width={260} height={140}>
          <PieChart>
            {/* Custom Tooltip */}
            <Tooltip content={<CustomTooltip />} />

            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={110}
              outerRadius={130}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell
                  style={{ cursor: "pointer" }}
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Info legend */}
        <div className="w-full h-fit flex items-center justify-center gap-6 mb-3 ms-3">
          {data?.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full`}
                style={{ backgroundColor: COLORS[index] }}
              ></div>
              <p className="text-sm">{entry.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksTotalOverview;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300">
        <p className="text-sm font-medium text-gray-700">
          {payload[0].name}:{" "}
          <span className="font-bold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
    })
  ),
};
