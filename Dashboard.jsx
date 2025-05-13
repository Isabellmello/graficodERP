import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "./components/ui/card";

const COLORS_EXPENSES = ["#6A0DAD", "#A020F0", "#FF5E5E", "#FF99CC"];
const COLORS_REVENUE = ["#006400", "#228B22", "#32CD32", "#66CDAA"];

const generateBarData = (year) => {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return months.map((month) => ({
    name: month,
    receitas: Math.floor(Math.random() * 5000) + 1000,
    despesas: Math.floor(Math.random() * 4000) + 800,
  }));
};

const expensesData = [
  { name: "Despesas fixas", value: 6874.5 },
  { name: "Despesas variáveis", value: 5625.5 },
  { name: "Saídas não operacionais", value: 1875 },
  { name: "Outras despesas", value: 625.5 },
];

const revenueData = [
  { name: "Categoria 1", value: 13542.5 },
  { name: "Categoria 2", value: 5207.5 },
  { name: "Categoria 3", value: 3125 },
  { name: "Categoria 4", value: 3125 },
];

const BarChartComponent = ({ data, title, period, year, setPeriod, setYear }) => (
  <Card className="mb-6 shadow-md">
    <CardContent className="p-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold text-gray-700">{title}</span>
        <div className="space-x-2">
          <select
            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option>Últimos 12 meses</option>
            <option>Últimos 6 meses</option>
            <option>Últimos 3 meses</option>
          </select>
          <select
            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="receitas" fill="#00C49F" name="Receitas" />
          <Bar dataKey="despesas" fill="#FF5E5E" name="Despesas" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const PieChartComponent = ({ data, title, colors, period, year, setPeriod, setYear }) => (
  <Card className="shadow-md">
    <CardContent className="p-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold text-gray-700">{title}</span>
        <div className="space-x-2">
          <select
            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option>Este ano</option>
            <option>Último ano</option>
          </select>
          <select
            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={50}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const SummaryCard = ({ data }) => {
  const totalReceitas = data.reduce((sum, entry) => sum + entry.receitas, 0);
  const totalDespesas = data.reduce((sum, entry) => sum + entry.despesas, 0);
  const saldo = totalReceitas - totalDespesas;

  return (
    <Card className="mb-6 shadow-md">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Resumo Financeiro</h3>
        <div className="space-y-2">
          <p>Total Receitas: <span className="font-bold text-green-600">R$ {totalReceitas.toFixed(2)}</span></p>
          <p>Total Despesas: <span className="font-bold text-red-600">R$ {totalDespesas.toFixed(2)}</span></p>
          <p>Saldo: <span className="font-bold text-blue-600">R$ {saldo.toFixed(2)}</span></p>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  const [barPeriod, setBarPeriod] = useState("Últimos 12 meses");
  const [expensePeriod, setExpensePeriod] = useState("Este ano");
  const [revenuePeriod, setRevenuePeriod] = useState("Este ano");
  const [year, setYear] = useState("2025");
  const [barData, setBarData] = useState(generateBarData(2025));

  useEffect(() => {
    setBarData(generateBarData(Number(year))); // Convertendo year para número
  }, [year]);

  const filterBarData = () => {
    const fullData = barData;
    if (barPeriod === "Últimos 12 meses") return fullData;
    if (barPeriod === "Últimos 6 meses") return fullData.slice(6);
    return fullData.slice(9); // Últimos 3 meses
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-800">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Dashboard Financeiro</h2>
        </div>

        <SummaryCard data={barData} />

        <BarChartComponent
          data={filterBarData()}
          title="Receitas vs Despesas"
          period={barPeriod}
          year={year}
          setPeriod={setBarPeriod}
          setYear={setYear}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PieChartComponent
            data={expensesData}
            title="Origem das Despesas"
            colors={COLORS_EXPENSES}
            period={expensePeriod}
            year={year}
            setPeriod={setExpensePeriod}
            setYear={setYear}
          />
          <PieChartComponent
            data={revenueData}
            title="Origem das Receitas"
            colors={COLORS_REVENUE}
            period={revenuePeriod}
            year={year}
            setPeriod={setRevenuePeriod}
            setYear={setYear}
          />
        </div>
      </div>
    </div>
  );
}