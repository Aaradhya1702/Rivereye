import React, { useEffect, useState } from "react";
import trendingSchemes from "../images/trendingSchemes.json";

function TrendingSchemes() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    // Simple: load from JSON
    setSchemes(trendingSchemes);
  }, []);

  return (
    <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
      <h3 className="text-green-600 font-semibold mb-3">🔥 What's New / Trending Schemes</h3>
      <ul className="space-y-2">
        {schemes.map((s, idx) => (
          <li key={idx} className="p-2 bg-white rounded shadow hover:shadow-lg transition">
            <a href={s.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-sky-700">{s.title}</a>
            <p className="text-gray-700 text-sm">{s.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrendingSchemes;
