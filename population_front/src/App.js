import React, { useEffect, useState, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function transformToDataByYear(rawData) {
  const dataByYearMap = {};

  rawData.forEach((item) => {
    const year = item["Year"];
    const country = item["Country name"];
    const population = parseInt(item["Population"].replace(/,/g, ""), 10);

    if (!dataByYearMap[year]) {
      dataByYearMap[year] = { year };
    }
    dataByYearMap[year][country] = population;
  });

  return Object.values(dataByYearMap).sort((a, b) => a.year - b.year);
}

export default function App() {
  const [chartDataByYear, setChartDataByYear] = useState([]);
  const [countries, setCountries] = useState([]);
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const intervalRef = useRef(null);

  // สีสำหรับ 10 อันดับ
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#d8854f",
    "#a4de6c",
    "#d0ed57",
    "#8dd1e1",
    "#83a6ed",
    "#8a79af",
    "#d88884",
  ];

  useEffect(() => {
    fetch("https://population-growth-h7sk.onrender.com/api/population")
      .then((res) => res.json())
      .then((json) => {
        const transformed = transformToDataByYear(json);
        setChartDataByYear(transformed);

        if (json.length > 0) {
          const uniqueCountries = Array.from(
            new Set(json.map((item) => item["Country name"]))
          );
          setCountries(uniqueCountries);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (chartDataByYear.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentYearIndex((prev) => (prev + 1) % chartDataByYear.length);
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, [chartDataByYear]);

  if (chartDataByYear.length === 0) {
    return <div>Loading data...</div>;
  }

  const currentData = chartDataByYear[currentYearIndex];

  // สร้างข้อมูลเรียงอันดับ และเพิ่มสีให้แต่ละบาร์
  const sortedData = countries
    .map((country) => ({
      name: country,
      population: currentData[country] || 0,
    }))
    .sort((a, b) => b.population - a.population)
    .slice(0, 10)
    .map((entry, index) => ({
      ...entry,
      fill: colors[index % colors.length],
    }));

  return (
    <div style={{ padding: 20 }}>
      <h2>Population (Year: {currentData.year})</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          layout="vertical"
          data={sortedData}
          margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
          barCategoryGap="15%"
          maxBarSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis
            type="category"
            dataKey="name"
            width={120}
            tick={{ fontSize: 14 }}
            reversed={false}
          />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Bar
            dataKey="population"
            isAnimationActive={true}
            animationDuration={1800}
            animationEasing="ease-in-out"
          >
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
