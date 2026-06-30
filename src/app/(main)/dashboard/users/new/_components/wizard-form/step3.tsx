"use client";

import { Controller, type UseFormReturn } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { FullFormData } from "./schema";

interface Step3Props {
  form: UseFormReturn<FullFormData>;
}

export function Step3({ form }: Step3Props) {
  const {
    control,
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-xl tracking-tight">Account Details</h2>
        <p className="text-muted-foreground text-sm">
          Set up your account credentials. A temporary password will be generated for you.
        </p>
      </div>

      <FieldGroup>
        <Field data-invalid={!!errors.email || undefined}>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <FieldError errors={[errors.email]} />}
        </Field>

        <Field data-invalid={!!errors.phoneNumber || undefined}>
          <FieldLabel htmlFor="phoneNumber">
            Phone Number <span className="font-normal text-muted-foreground">(optional)</span>
          </FieldLabel>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="+1 234 567 8900"
            aria-invalid={!!errors.phoneNumber}
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && <FieldError errors={[errors.phoneNumber]} />}
        </Field>

        <Controller
          name="autoConfirm"
          control={control}
          render={({ field }) => (
            <Field orientation="horizontal" className="items-start rounded-lg border p-4">
              <Checkbox
                id="autoConfirm"
                checked={field.value === true}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                className="mt-0.5"
              />
              <FieldContent>
                <FieldLabel htmlFor="autoConfirm" className="font-medium">
                  Auto-confirm email &amp; phone number{" "}
                  <span className="font-normal text-muted-foreground">(optional)</span>
                </FieldLabel>
                <FieldDescription>
                  Skip OTP verification — your email address and phone number will be marked as confirmed automatically
                  without sending a verification code.
                </FieldDescription>
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>
    </div>
  );
}
