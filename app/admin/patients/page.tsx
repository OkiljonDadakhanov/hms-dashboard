import Dashboard from "@/components/dashboard";
import { PatientForm } from "@/components/patient-form";
import React from "react";

export default function PatientsPage() {
  return (
    <>
      <Dashboard />
      <PatientForm onSubmit={PatientForm} />
    </>
  );
}
