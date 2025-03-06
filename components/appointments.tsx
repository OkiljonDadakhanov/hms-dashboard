"use client";

import { useState } from "react";
import { Filter, Plus, Search, X } from "lucide-react";
import Image from "next/image";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { AppointmentForm } from "./appointment-form";

// Sample appointments data using the existing patient data
const initialAppointments = [
  {
    id: 1,
    time: "9:30 AM",
    date: "05/12/2022",
    patientId: 1,
    doctor: "Dr. John",
    status: "scheduled",
    feeStatus: "paid",
  },
  {
    id: 2,
    time: "9:30 AM",
    date: "05/12/2022",
    patientId: 2,
    doctor: "Dr. Joel",
    status: "scheduled",
    feeStatus: "unpaid",
  },
  {
    id: 3,
    time: "10:30 AM",
    date: "05/12/2022",
    patientId: 3,
    doctor: "Dr. Joel",
    status: "scheduled",
    feeStatus: "paid",
  },
  {
    id: 4,
    time: "11:00 AM",
    date: "05/12/2022",
    patientId: 4,
    doctor: "Dr. John",
    status: "completed",
    feeStatus: "unpaid",
  },
  {
    id: 5,
    time: "11:30 AM",
    date: "05/12/2022",
    patientId: 5,
    doctor: "Dr. John",
    status: "completed",
    feeStatus: "unpaid",
  },
  {
    id: 6,
    time: "11:00 AM",
    date: "05/12/2022",
    patientId: 6,
    doctor: "Dr. John",
    status: "completed",
    feeStatus: "unpaid",
  },
  {
    id: 7,
    time: "11:00 AM",
    date: "05/12/2022",
    patientId: 7,
    doctor: "Dr. John",
    status: "completed",
    feeStatus: "paid",
  },
];

// Import the patient data from the dashboard
const patients = [
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
    hasAvatar: false,
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
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const appointmentsPerPage = 7;

  // Filter appointments based on status and search term
  const filterAppointments = (status: string) => {
    return appointments
      .filter((appointment) => appointment.status === status)
      .filter((appointment) => {
        const patient = patients.find((p) => p.id === appointment.patientId);
        if (!patient) return false;
        return (
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.date.includes(searchTerm)
        );
      });
  };

  const newAppointments = filterAppointments("scheduled");
  const completedAppointments = filterAppointments("completed");

  // Pagination
  const getPageData = (data: typeof appointments) => {
    const indexOfLastItem = currentPage * appointmentsPerPage;
    const indexOfFirstItem = indexOfLastItem - appointmentsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Handle appointment actions
  const handleCancelAppointment = (id: number) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  const handleReschedule = (id: number) => {
    // Implement rescheduling logic
    console.log("Reschedule appointment:", id);
  };

  const handleRequestFee = (id: number) => {
    // Implement fee request logic
    console.log("Request fee for appointment:", id);
  };

  const handleAddAppointment = (data: any) => {
    const newAppointment = {
      id: appointments.length + 1,
      ...data,
      status: "scheduled",
      feeStatus: "unpaid",
    };
    setAppointments([...appointments, newAppointment]);
    setIsAddAppointmentOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Appointments</h1>
        <Dialog
          open={isAddAppointmentOpen}
          onOpenChange={setIsAddAppointmentOpen}
        >
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>New Appointment</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Appointment</DialogTitle>
            </DialogHeader>
            <AppointmentForm
              onSubmit={handleAddAppointment}
              patients={patients}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="new" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="new"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
          >
            NEW APPOINTMENTS
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
          >
            COMPLETED APPOINTMENTS
          </TabsTrigger>
        </TabsList>

        <div className="flex justify-between items-center my-4">
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
          <Button variant="outline" className="flex items-center gap-2 ml-4">
            <span>Filter by Date</span>
            <Filter size={16} />
          </Button>
        </div>

        <TabsContent value="new" className="mt-0">
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Patient Age</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead className="text-center">User Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getPageData(newAppointments).map((appointment) => {
                  const patient = patients.find(
                    (p) => p.id === appointment.patientId
                  );
                  if (!patient) return null;

                  return (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {patient.hasAvatar ? (
                            <Image
                              src={
                                patient.avatar.startsWith("data:")
                                  ? patient.avatar
                                  : patient.avatar || "/placeholder.svg"
                              }
                              alt={patient.name}
                              width={40}
                              height={40}
                              className="rounded-full object-cover h-10 w-10"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                              {patient.initials}
                            </div>
                          )}
                          <span>{patient.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-blue-500"
                            onClick={() => handleReschedule(appointment.id)}
                          >
                            Reschedule
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-500 w-8 h-8 p-0"
                            onClick={() =>
                              handleCancelAppointment(appointment.id)
                            }
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
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

                  {Array.from(
                    {
                      length: Math.ceil(
                        newAppointments.length / appointmentsPerPage
                      ),
                    },
                    (_, i) => i + 1
                  ).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(
                            prev + 1,
                            Math.ceil(
                              newAppointments.length / appointmentsPerPage
                            )
                          )
                        )
                      }
                      className={
                        currentPage ===
                        Math.ceil(newAppointments.length / appointmentsPerPage)
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

        <TabsContent value="completed" className="mt-0">
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Patient Age</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Fee Status</TableHead>
                  <TableHead className="text-center">User Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getPageData(completedAppointments).map((appointment) => {
                  const patient = patients.find(
                    (p) => p.id === appointment.patientId
                  );
                  if (!patient) return null;

                  return (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {patient.hasAvatar ? (
                            <Image
                              src={
                                patient.avatar.startsWith("data:")
                                  ? patient.avatar
                                  : patient.avatar || "/placeholder.svg"
                              }
                              alt={patient.name}
                              width={40}
                              height={40}
                              className="rounded-full object-cover h-10 w-10"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                              {patient.initials}
                            </div>
                          )}
                          <span>{patient.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            appointment.feeStatus === "paid"
                              ? "default"
                              : "destructive"
                          }
                          className={
                            appointment.feeStatus === "paid"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {appointment.feeStatus === "paid" ? "Paid" : "UnPaid"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          {appointment.feeStatus === "unpaid" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-blue-500"
                              onClick={() => handleRequestFee(appointment.id)}
                            >
                              Request Fee
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
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

                  {Array.from(
                    {
                      length: Math.ceil(
                        completedAppointments.length / appointmentsPerPage
                      ),
                    },
                    (_, i) => i + 1
                  ).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(
                            prev + 1,
                            Math.ceil(
                              completedAppointments.length / appointmentsPerPage
                            )
                          )
                        )
                      }
                      className={
                        currentPage ===
                        Math.ceil(
                          completedAppointments.length / appointmentsPerPage
                        )
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
  );
}
