"use client";

import type React from "react";
import Image from "next/image";

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
import { User } from "lucide-react";

interface PatientFormProps {
  onSubmit: (data: any) => void;
}

export function PatientForm({ onSubmit }: PatientFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    avatar: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Image size should be less than 5MB",
      }));
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, avatar: "Please upload an image file" }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      setFormData((prev) => ({ ...prev, avatar: base64String }));

      // Clear error if exists
      if (errors.avatar) {
        setErrors((prev) => ({ ...prev, avatar: "" }));
      }
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0)
      newErrors.age = "Age must be a valid number";

    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+?\d[\d\s-]{8,}$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone number";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        ...formData,
        age: Number(formData.age),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={errors.age ? "border-red-500" : ""}
          />
          {errors.age && <p className="text-xs text-red-500">{errors.age}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => handleSelectChange("gender", value)}
          >
            <SelectTrigger
              id="gender"
              className={errors.gender ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-xs text-red-500">{errors.gender}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bloodGroup">Blood Group</Label>
          <Select
            value={formData.bloodGroup}
            onValueChange={(value) => handleSelectChange("bloodGroup", value)}
          >
            <SelectTrigger
              id="bloodGroup"
              className={errors.bloodGroup ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+ve">A+ve</SelectItem>
              <SelectItem value="A-ve">A-ve</SelectItem>
              <SelectItem value="B+ve">B+ve</SelectItem>
              <SelectItem value="B-ve">B-ve</SelectItem>
              <SelectItem value="AB+ve">AB+ve</SelectItem>
              <SelectItem value="AB-ve">AB-ve</SelectItem>
              <SelectItem value="O+ve">O+ve</SelectItem>
              <SelectItem value="O-ve">O-ve</SelectItem>
            </SelectContent>
          </Select>
          {errors.bloodGroup && (
            <p className="text-xs text-red-500">{errors.bloodGroup}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="avatar">Patient Photo</Label>
        <div className="mt-2 flex items-center gap-4">
          {imagePreview ? (
            <div className="relative">
              <Image
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                onClick={() => {
                  setImagePreview(null);
                  setFormData((prev) => ({ ...prev, avatar: "" }));
                }}
              >
                ×
              </Button>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border">
              <User className="h-12 w-12 text-gray-300" />
            </div>
          )}
          <div className="flex-1">
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={errors.avatar ? "border-red-500" : ""}
            />
            {errors.avatar && (
              <p className="text-xs text-red-500 mt-1">{errors.avatar}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Upload a profile picture for the patient. Max size: 5MB.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Add Patient</Button>
      </div>
    </form>
  );
}
