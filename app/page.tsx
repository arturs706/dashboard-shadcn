"use client";
import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You are logged in as: </p>
          <p>Your account level is: </p>
          
        </CardContent>
      </Card>
    </div>
  );
}


export default Dashboard;