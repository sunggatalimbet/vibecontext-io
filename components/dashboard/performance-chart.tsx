"use client";

import { useEffect, useState } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const data = [
  { name: "Jan", users: 3000, sessions: 4000, pageviews: 2400 },
  { name: "Feb", users: 3300, sessions: 4300, pageviews: 2210 },
  { name: "Mar", users: 5000, sessions: 6100, pageviews: 3290 },
  { name: "Apr", users: 3908, sessions: 4800, pageviews: 2000 },
  { name: "May", users: 4800, sessions: 5900, pageviews: 2181 },
  { name: "Jun", users: 5300, sessions: 6500, pageviews: 2500 },
  { name: "Jul", users: 6500, sessions: 7700, pageviews: 2100 },
  { name: "Aug", users: 6300, sessions: 7300, pageviews: 3100 },
  { name: "Sep", users: 4500, sessions: 5400, pageviews: 2400 },
  { name: "Oct", users: 5000, sessions: 6000, pageviews: 2290 },
  { name: "Nov", users: 4900, sessions: 5800, pageviews: 2490 },
  { name: "Dec", users: 6200, sessions: 7200, pageviews: 3300 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className="bg-card/95 backdrop-blur-md border-border shadow-lg">
        <CardContent className="p-3">
          <p className="font-medium">{label}</p>
          <div className="mt-2 space-y-1 text-sm">
            {payload.map((entry: any, index: number) => (
              <div key={`item-${index}`} className="flex items-center gap-2">
                <div 
                  className="h-3 w-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-muted-foreground">{entry.name}:</span>
                <span className="font-medium">{entry.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  return null;
};

export function PerformanceChart() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center text-muted-foreground">
        Loading chart...
      </div>
    );
  }

  return (
    <div className="h-[350px] w-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))" 
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))" 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: 20, fontSize: 12 }}
            iconType="circle"
            iconSize={8}
          />
          <Area
            type="monotone"
            dataKey="users"
            stroke="hsl(var(--chart-1))"
            fillOpacity={1}
            fill="url(#colorUsers)"
            name="Users"
          />
          <Area
            type="monotone"
            dataKey="sessions"
            stroke="hsl(var(--chart-2))"
            fillOpacity={1}
            fill="url(#colorSessions)"
            name="Sessions"
          />
          <Area
            type="monotone"
            dataKey="pageviews"
            stroke="hsl(var(--chart-3))"
            fillOpacity={1}
            fill="url(#colorPageviews)"
            name="Pageviews"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}