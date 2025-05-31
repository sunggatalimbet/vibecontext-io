"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, UsersIcon, BoxIcon, DollarSignIcon, ActivityIcon } from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    description: "+20.1% from last month",
    trend: "up",
    icon: <DollarSignIcon className="h-4 w-4" />,
  },
  {
    title: "Subscriptions",
    value: "2,350",
    description: "+180 from last week",
    trend: "up",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    title: "Active Now",
    value: "573",
    description: "+201 since yesterday",
    trend: "up",
    icon: <ActivityIcon className="h-4 w-4" />,
  },
  {
    title: "Inventory",
    value: "1,259",
    description: "-30 from last week",
    trend: "down",
    icon: <BoxIcon className="h-4 w-4" />,
  },
];

export function DashboardStats() {
  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden transition-all duration-200 hover:ring-1 hover:ring-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center text-xs mt-1">
              <span
                className={`mr-1 rounded-full p-1 ${
                  stat.trend === "up" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpIcon className="h-3 w-3" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3" />
                )}
              </span>
              <CardDescription>{stat.description}</CardDescription>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}