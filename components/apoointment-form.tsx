"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Patient {
  id: number;
  name: string;
  age: number;
}

interface AppointmentFormProps {
  onSubmit: (data: unknown) => void;
  patients: Patient[];
}

export function AppointmentForm({ onSubmit, patients }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    patientId: "",
    date: "",
    time: "",
    doctor: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const doctors = ["Dr. John", "Dr. Joel"]; // Add more doctors as needed

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientId) newErrors.patientId = "Patient is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.doctor) newErrors.doctor = "Doctor is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="patient">Patient</Label>
          <Select
            value={formData.patientId}
            onValueChange={(value) => handleChange("patientId", value)}
          >
            <SelectTrigger
              id="patient"
              className={errors.patientId ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select patient" />
            </SelectTrigger>
            <SelectContent>
              {patients.map((patient) => (
                <SelectItem key={patient.id} value={String(patient.id)}>
                  {patient.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.patientId && (
            <p className="text-xs text-red-500">{errors.patientId}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className={errors.date ? "border-red-500" : ""}
          />
          {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => handleChange("time", e.target.value)}
            className={errors.time ? "border-red-500" : ""}
          />
          {errors.time && <p className="text-xs text-red-500">{errors.time}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="doctor">Doctor</Label>
          <Select
            value={formData.doctor}
            onValueChange={(value) => handleChange("doctor", value)}
          >
            <SelectTrigger
              id="doctor"
              className={errors.doctor ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select doctor" />
            </SelectTrigger>
            <SelectContent>
              {doctors.map((doctor) => (
                <SelectItem key={doctor} value={doctor}>
                  {doctor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.doctor && (
            <p className="text-xs text-red-500">{errors.doctor}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Add Appointment</Button>
      </div>
    </form>
  );
}
