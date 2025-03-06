"use client";

import { useState } from "react";
import {
  BarChart3,
  Calendar,
  ChevronDown,
  FileText,
  Filter,
  Info,
  LogOut,
  MessageSquare,
  Package2,
  Plus,
  Search,
  Settings,
  Trash2,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientForm } from "./patient-form";

// Define a type for your patient data
type Patient = {
  id: number;
  name: string;
  avatar: string;
  initials: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
  hasAvatar: boolean;
};

// Type for new patient data coming from the form
type NewPatientData = Omit<Patient, "id" | "hasAvatar" | "initials">;

// Sample patient data
const initialPatients: Patient[] = [
  {
    id: 1,
    name: "Elizabeth Polson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EP",
    age: 32,
    gender: "Female",
    bloodGroup: "B+ve",
    phone: "+91 12345 67890",
    email: "elizabethpolson@hotmail.com",
    hasAvatar: true,
  },
  {
    id: 2,
    name: "John David",
    avatar: "",
    initials: "JD",
    age: 28,
    gender: "Male",
    bloodGroup: "B+ve",
    phone: "+91 12345 67890",
    email: "davidjohn22@gmail.com",
    hasAvatar: true,
  },
  {
    id: 3,
    name: "Krishtav Rajan",
    avatar: "",
    initials: "KR",
    age: 24,
    gender: "Male",
    bloodGroup: "AB-ve",
    phone: "+91 12345 67890",
    email: "krishnavrajan23@gmail.com",
    hasAvatar: false,
  },
  {
    id: 4,
    name: "Sumanth Tinson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ST",
    age: 26,
    gender: "Male",
    bloodGroup: "O+ve",
    phone: "+91 12345 67890",
    email: "tintintin@gmail.com",
    hasAvatar: true,
  },
  {
    id: 5,
    name: "EG Subramani",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ES",
    age: 77,
    gender: "Male",
    bloodGroup: "AB+ve",
    phone: "+91 12345 67890",
    email: "egs31322@gmail.com",
    hasAvatar: true,
  },
  {
    id: 6,
    name: "Ranjan Maari",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RM",
    age: 77,
    gender: "Male",
    bloodGroup: "O+ve",
    phone: "+91 12345 67890",
    email: "ranjanmaari@yahoo.com",
    hasAvatar: true,
  },
  {
    id: 7,
    name: "Phillipie Gopai",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "PG",
    age: 55,
    gender: "Male",
    bloodGroup: "O-ve",
    phone: "+91 12345 67890",
    email: "gopai22@gmail.com",
    hasAvatar: true,
  },
  {
    id: 8,
    name: "Sarah Johnson",
    avatar: "",
    initials: "SJ",
    age: 42,
    gender: "Female",
    bloodGroup: "A+ve",
    phone: "+91 12345 67890",
    email: "sarahjohnson@gmail.com",
    hasAvatar: false,
  },
  {
    id: 9,
    name: "Michael Chen",
    avatar: "",
    initials: "MC",
    age: 35,
    gender: "Male",
    bloodGroup: "B-ve",
    phone: "+91 12345 67890",
    email: "michaelchen@gmail.com",
    hasAvatar: false,
  },
  {
    id: 10,
    name: "Priya Sharma",
    avatar: "",
    initials: "PS",
    age: 29,
    gender: "Female",
    bloodGroup: "O+ve",
    phone: "+91 12345 67890",
    email: "priyasharma@gmail.com",
    hasAvatar: false,
  },
  {
    id: 11,
    name: "David Wilson",
    avatar: "",
    initials: "DW",
    age: 61,
    gender: "Male",
    bloodGroup: "A-ve",
    phone: "+91 12345 67890",
    email: "davidwilson@gmail.com",
    hasAvatar: false,
  },
  {
    id: 12,
    name: "Aisha Patel",
    avatar: "",
    initials: "AP",
    age: 38,
    gender: "Female",
    bloodGroup: "AB+ve",
    phone: "+91 12345 67890",
    email: "aishapatel@gmail.com",
    hasAvatar: false,
  },
];

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Patient;
    direction: "ascending" | "descending";
  } | null>(null);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const patientsPerPage = 7;

  // Handle sorting
  const requestSort = (key: keyof Patient) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting and filtering
  const sortedPatients = [...patients].filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortConfig !== null) {
    sortedPatients.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  // Pagination
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = sortedPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const totalPages = Math.ceil(sortedPatients.length / patientsPerPage);

  // Handle patient deletion
  const handleDeletePatient = (id: number) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  // Handle adding a new patient
  const handleAddPatient = (newPatient: NewPatientData) => {
    const id =
      patients.length > 0 ? Math.max(...patients.map((p) => p.id)) + 1 : 1;
    setPatients([
      ...patients,
      {
        ...newPatient,
        id,
        hasAvatar: false,
        initials: newPatient.name
          .split(" ")
          .map((n: string) => n[0])
          .join(""),
      },
    ]);
    setIsAddPatientOpen(false);
  };

  // Get sort direction icon
  const getSortDirectionIcon = (key: keyof Patient) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ChevronDown className="ml-1 h-4 w-4" />;
    }
    return sortConfig.direction === "ascending" ? (
      <ChevronDown className="ml-1 h-4 w-4 text-blue-500" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4 rotate-180 text-blue-500" />
    );
  };

  return (
    <div className="flex min-h-screen bg-[#f0f7ff]">
      {/* Sidebar */}
      <div className="w-[200px] bg-white shadow-sm">
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
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-500 rounded-md hover:bg-blue-50"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-blue-500 bg-blue-50 rounded-md border-l-4 border-blue-500"
          >
            <Users className="w-5 h-5" />
            <span>Patients</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-500 rounded-md hover:bg-blue-50"
          >
            <Calendar className="w-5 h-5" />
            <span>Appointments</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-500 rounded-md hover:bg-blue-50"
          >
            <User className="w-5 h-5" />
            <span>Doctors</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-500 rounded-md hover:bg-blue-50"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-500 rounded-md hover:bg-blue-50"
          >
            <FileText className="w-5 h-5" />
            <span>Education Content</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-500 rounded-md hover:bg-blue-50"
          >
            <Package2 className="w-5 h-5" />
            <span>Medicine Inventory</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-500 rounded-md hover:bg-blue-50"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-gray-500 rounded-md hover:bg-blue-50"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white p-4 flex justify-between items-center shadow-sm">
          <h1 className="text-xl font-semibold">Patient Details</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute right-1 top-1 w-2 h-2 bg-red-500 rounded-full"></div>
              <Button variant="ghost" size="icon" className="text-gray-500">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                    stroke="#718096"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                    stroke="#718096"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Jonitha Cathrine</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          <Tabs defaultValue="patient-info">
            <TabsList className="mb-4 border-b w-full justify-start rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="patient-info"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
              >
                Patient Info
              </TabsTrigger>
            </TabsList>
            <TabsContent value="patient-info" className="mt-0">
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-md">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    placeholder="Search"
                    className="pl-10 bg-white border-gray-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <span>Filter by Date</span>
                    <Filter size={16} />
                  </Button>
                  <Dialog
                    open={isAddPatientOpen}
                    onOpenChange={setIsAddPatientOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600">
                        <Plus size={16} />
                        <span>New Patient</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Add New Patient</DialogTitle>
                      </DialogHeader>
                      <PatientForm onSubmit={handleAddPatient} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="bg-white rounded-md shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => requestSort("name")}
                      >
                        <div className="flex items-center">
                          Patient Name
                          {getSortDirectionIcon("name")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => requestSort("age")}
                      >
                        <div className="flex items-center">
                          Age
                          {getSortDirectionIcon("age")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => requestSort("gender")}
                      >
                        <div className="flex items-center">
                          Gender
                          {getSortDirectionIcon("gender")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => requestSort("bloodGroup")}
                      >
                        <div className="flex items-center">
                          Blood Group
                          {getSortDirectionIcon("bloodGroup")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => requestSort("phone")}
                      >
                        <div className="flex items-center">
                          Phone Number
                          {getSortDirectionIcon("phone")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => requestSort("email")}
                      >
                        <div className="flex items-center">
                          Email ID
                          {getSortDirectionIcon("email")}
                        </div>
                      </TableHead>
                      <TableHead className="text-center">User Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {patient.hasAvatar ? (
                              <Image
                                src={patient.avatar || "/placeholder.svg"}
                                alt={patient.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            ) : (
                              <div
                                className={`w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium`}
                              >
                                {patient.initials}
                              </div>
                            )}
                            <span>{patient.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>{patient.bloodGroup}</TableCell>
                        <TableCell>{patient.phone}</TableCell>
                        <TableCell>{patient.email}</TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="w-8 h-8 p-0 text-blue-500"
                                >
                                  <MessageSquare size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Message {patient.name}
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                      Message
                                    </label>
                                    <textarea
                                      className="w-full min-h-[100px] p-2 border rounded-md"
                                      placeholder="Type your message here..."
                                    />
                                  </div>
                                  <Button className="w-full">
                                    Send Message
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Button
                              size="sm"
                              variant="outline"
                              className="w-8 h-8 p-0 text-red-500"
                              onClick={() => handleDeletePatient(patient.id)}
                            >
                              <Trash2 size={16} />
                            </Button>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="w-8 h-8 p-0 text-gray-500"
                                >
                                  <Info size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Patient Details</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="flex items-center gap-4">
                                    {patient.hasAvatar ? (
                                      <Image
                                        src={
                                          patient.avatar || "/placeholder.svg"
                                        }
                                        alt={patient.name}
                                        width={60}
                                        height={60}
                                        className="rounded-full"
                                      />
                                    ) : (
                                      <div
                                        className={`w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-medium`}
                                      >
                                        {patient.initials}
                                      </div>
                                    )}
                                    <div>
                                      <h3 className="text-lg font-semibold">
                                        {patient.name}
                                      </h3>
                                      <p className="text-gray-500">
                                        {patient.email}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        Age
                                      </p>
                                      <p>{patient.age}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        Gender
                                      </p>
                                      <p>{patient.gender}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        Blood Group
                                      </p>
                                      <p>{patient.bloodGroup}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        Phone
                                      </p>
                                      <p>{patient.phone}</p>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                <div className="p-4 border-t">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
