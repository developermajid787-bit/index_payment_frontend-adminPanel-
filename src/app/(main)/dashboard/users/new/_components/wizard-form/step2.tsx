"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

import type { FullFormData } from "./schema";

interface Step2Props {
  form: UseFormReturn<FullFormData>;
}

export function Step2({ form }: Step2Props) {
  const {
    control,
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-xl tracking-tight">Personal Information</h2>
        <p className="text-muted-foreground text-sm">Enter the details exactly as they appear on your National ID.</p>
      </div>

      <FieldGroup>
        <Field data-invalid={!!errors.fullName || undefined}>
          <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
          <Input
            id="fullName"
            placeholder="First Second Third Fourth"
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          {errors.fullName && <FieldError errors={[errors.fullName]} />}
        </Field>

        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined}>
              <FieldLabel>Date of Birth</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    aria-invalid={fieldState.invalid}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    captionLayout="dropdown"
                    fromYear={1920}
                    toYear={new Date().getFullYear() - 1}
                    disabled={(date) => date >= new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field data-invalid={!!errors.placeOfBirth || undefined}>
          <FieldLabel htmlFor="placeOfBirth">Place of Birth</FieldLabel>
          <Input
            id="placeOfBirth"
            placeholder="City, Country"
            aria-invalid={!!errors.placeOfBirth}
            {...register("placeOfBirth")}
          />
          {errors.placeOfBirth && <FieldError errors={[errors.placeOfBirth]} />}
        </Field>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Controller
            name="gender"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid || undefined}>
                <FieldLabel>Gender</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="idType"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid || undefined}>
                <FieldLabel>ID Type</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger aria-invalid={fieldState.invalid} className="w-full">
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national_id">National ID</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="driving_license">Driving License</SelectItem>
                    <SelectItem value="residence">Residence Card</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <Field data-invalid={!!errors.idNumber || undefined}>
          <FieldLabel htmlFor="idNumber">ID Number</FieldLabel>
          <Input
            id="idNumber"
            placeholder="Enter your ID number"
            aria-invalid={!!errors.idNumber}
            {...register("idNumber")}
          />
          {errors.idNumber && <FieldError errors={[errors.idNumber]} />}
        </Field>
      </FieldGroup>
    </div>
  );
}
