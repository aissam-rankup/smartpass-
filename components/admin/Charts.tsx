"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export function MrrChart({ data }: { data: { month: string; mrr: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D3CFC6" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#888780" }} />
        <YAxis tick={{ fontSize: 11, fill: "#888780" }} width={50} />
        <Tooltip
          contentStyle={{ background: "#fff", border: "1px solid #D3CFC6", fontSize: 12 }}
          formatter={(v: number) => [`${v} MAD`, "MRR"]}
        />
        <Line type="monotone" dataKey="mrr" stroke="#D85A30" strokeWidth={2.5} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SignupsChart({ data }: { data: { day: string; count: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D3CFC6" />
        <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#888780" }} />
        <YAxis tick={{ fontSize: 11, fill: "#888780" }} width={30} allowDecimals={false} />
        <Tooltip contentStyle={{ background: "#fff", border: "1px solid #D3CFC6", fontSize: 12 }} />
        <Bar dataKey="count" fill="#1D9E75" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ScansByPartnerChart({ data }: { data: { partner: string; scans: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(260, data.length * 32)}>
      <BarChart data={data} layout="vertical" margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D3CFC6" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 11, fill: "#888780" }} />
        <YAxis
          type="category"
          dataKey="partner"
          tick={{ fontSize: 11, fill: "#1a1a18" }}
          width={140}
        />
        <Tooltip contentStyle={{ background: "#fff", border: "1px solid #D3CFC6", fontSize: 12 }} />
        <Bar dataKey="scans" fill="#D85A30" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
