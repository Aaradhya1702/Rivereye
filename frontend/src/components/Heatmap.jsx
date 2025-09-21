import React from "react";

const thresholds = { DO: 5, BOD: 3, Nitrate: 10, FecalColiform: 500 };

const Heatmap = ({ data }) => {
  if (!data || data.length === 0) return null;
  const parameters = Object.keys(data[0].parameters);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
        Parameter Heatmap (Last 10 Days)
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-sky-50 text-gray-600">
            <tr>
              <th className="p-2 border">Date</th>
              {parameters.map((p) => (
                <th key={p} className="p-2 border">
                  {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.date} className="text-center">
                <td className="p-2 border">
                  {new Date(d.date).toLocaleDateString()}
                </td>
                {parameters.map((p) => {
                  const value = d.parameters[p];
                  const safe =
                    p === "DO" ? value >= thresholds[p] : value <= thresholds[p];
                  return (
                    <td
                      key={p}
                      className={`p-2 border font-medium ${
                        safe
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Heatmap;
