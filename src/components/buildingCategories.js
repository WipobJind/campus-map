import React from 'react';
import { BookOpen, Building2, Home, Activity, Navigation } from 'lucide-react';

export const buildingCategories = {
  academic: {
    name: "Academic Buildings",
    icon: <BookOpen className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-600"
  },
  facilities: {
    name: "Facilities",
    icon: <Building2 className="w-5 h-5" />,
    color: "bg-green-100 text-green-600"
  },
  residence: {
    name: "Residence Halls",
    icon: <Home className="w-5 h-5" />,
    color: "bg-yellow-100 text-yellow-600"
  },
  sports: {
    name: "Sports Facilities",
    icon: <Activity className="w-5 h-5" />,
    color: "bg-purple-100 text-purple-600"
  },
  others: {
    name: "Others",
    icon: <Navigation className="w-5 h-5" />,
    color: "bg-red-100 text-red-600"
  }
};