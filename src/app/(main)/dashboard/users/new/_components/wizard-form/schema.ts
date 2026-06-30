"use client";

import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MiB

export const step1Schema = z.object({
  nationalIdImage: z
    .any()
    .refine((f): f is File => f instanceof File, {
      message: "Please upload your National ID image.",
    })
    .refine((f) => !(f instanceof File) || f.type === "image/webp", {
      message: "Only WebP image format is accepted.",
    })
    .refine((f) => !(f instanceof File) || f.size <= MAX_FILE_SIZE, {
      message: "File size must not exceed 5 MiB.",
    }),
});

export const step2Schema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required.")
    .refine(
      (val) => val.trim().split(/\s+/).filter(Boolean).length >= 4,
      "Full name must contain at least 4 names (quadruple name).",
    ),
  dateOfBirth: z
    .date({ error: "Date of birth is required." })
    .refine((d) => d < new Date(), "Date of birth must be in the past."),
  placeOfBirth: z.string().min(2, "Place of birth is required."),
  gender: z.enum(["male", "female"], {
    error: "Please select a gender.",
  }),
  idType: z.enum(["national_id", "passport", "driving_license", "residence"], {
    error: "Please select an ID type.",
  }),
  idNumber: z
    .string()
    .min(5, "ID number must be at least 5 characters.")
    .max(30, "ID number must not exceed 30 characters."),
});

export const step3Schema = z.object({
  email: z.string().email("Please enter a valid email address."),
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[\d\s\-()]{7,20}$/.test(val), "Please enter a valid phone number."),
  autoConfirm: z.boolean().optional(),
});

export const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema);

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type FullFormData = z.infer<typeof fullSchema>;
