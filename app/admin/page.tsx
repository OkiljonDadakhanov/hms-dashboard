"use client";

import {
  BarChart3,
  Calendar,
  FileText,
  LogOut,
  MessageSquare,
  Package2,
  Settings,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Admin() {
  return (
    <div className="flex min-h-screen bg-[#f0f7ff]">
      {/* Sidebar */}
      <div className="w-[200px] bg-white shadow-sm relative">
        <div className="flex items-center gap-2 p-4 border-b">
          <div className="text-blue-500">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6.66667C12.6667 6.66667 6.66667 12.6667 6.66667 20C6.66667 27.3333 12.6667 33.3333 20 33.3333C27.3333 33.3333 33.3333 27.3333 33.3333 20C33.3333 12.6667 27.3333 6.66667 20 6.66667Z"
                fill="#2D89FF"
              />
              <path
                d="M20 13.3333V26.6667"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.3333 20H26.6666"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-blue-500">HMS</h1>
        </div>

        <nav className="p-2">
          <NavItem
            href="#"
            icon={<BarChart3 className="w-5 h-5" />}
            text="Dashboard"
          />
          <NavItem
            href="/admin/patients"
            icon={<Users className="w-5 h-5" />}
            text="Patients"
            isActive
          />
          <NavItem
            href="/admin/appointments"
            icon={<Calendar className="w-5 h-5" />}
            text="Appointments"
          />
          <NavItem
            href="#"
            icon={<User className="w-5 h-5" />}
            text="Doctors"
          />
          <NavItem
            href="#"
            icon={<MessageSquare className="w-5 h-5" />}
            text="Messages"
          />
          <NavItem
            href="#"
            icon={<FileText className="w-5 h-5" />}
            text="Education Content"
          />
          <NavItem
            href="#"
            icon={<Package2 className="w-5 h-5" />}
            text="Medicine Inventory"
          />
          <NavItem
            href="#"
            icon={<Settings className="w-5 h-5" />}
            text="Settings"
          />
        </nav>

        {/* Logout button */}
        <div className="absolute bottom-4 left-4 right-4">
          <NavItem
            href="#"
            icon={<LogOut className="w-5 h-5" />}
            text="Logout"
          />
        </div>
      </div>
    </div>
  );
}

// Reusable Navigation Item Component
const NavItem = ({ href, icon, text, isActive = false }) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-4 py-2 rounded-md ${
      isActive
        ? "text-blue-500 bg-blue-50 border-l-4 border-blue-500"
        : "text-gray-500 hover:bg-blue-50"
    }`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);
