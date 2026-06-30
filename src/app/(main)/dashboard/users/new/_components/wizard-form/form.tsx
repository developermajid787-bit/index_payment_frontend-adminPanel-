"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

import { type FullFormData, fullSchema, step1Schema, step2Schema, step3Schema } from "./schema";
import { Step1 } from "./step1";
import { Step2 } from "./step2";
import { Step3 } from "./step3";
import { SuccessDialog } from "./success-dialog";

const STEPS = [
  { id: 1, label: "ID Upload", description: "Upload your National ID photo" },
  {
    id: 2,
    label: "Personal Data",
    description: "Fill in your personal details",
  },
  { id: 3, label: "Account Setup", description: "Configure your account" },
];

function generateUsername(email: string, fullName: string): string {
  const nameParts = fullName.trim().split(/\s+/);
  const firstName = nameParts[0]?.toLowerCase() ?? "";
  const lastName = nameParts[nameParts.length - 1]?.toLowerCase() ?? "";
  const emailPrefix = email.split("@")[0]?.toLowerCase() ?? "";
  const candidate = `${firstName}.${lastName}`;
  const suffix = Math.floor(Math.random() * 900 + 100);
  return candidate.length > 3 ? `${candidate}${suffix}` : `${emailPrefix}${suffix}`;
}

function generateOtp(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export function WizardForm() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isNavigating, setIsNavigating] = React.useState(false);
  const [successData, setSuccessData] = React.useState<{
    username: string;
    email: string;
    phoneNumber: string;
    temporaryPassword: string;
  } | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const form = useForm<FullFormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      fullName: "",
      placeOfBirth: "",
      idNumber: "",
      email: "",
      phoneNumber: "",
    },
    mode: "onTouched",
  });

  const stepFields: Array<Array<keyof FullFormData>> = [
    ["nationalIdImage"],
    ["fullName", "dateOfBirth", "placeOfBirth", "gender", "idType", "idNumber"],
    ["email", "phoneNumber"],
  ];

  const schemaForStep = [step1Schema, step2Schema, step3Schema];

  const handleNext = async () => {
    const schema = schemaForStep[currentStep - 1];
    const fields = stepFields[currentStep - 1];
    if (!schema || !fields) return;

    setIsNavigating(true);

    const isValid = await form.trigger(fields);
    if (!isValid) {
      setIsNavigating(false);
      return;
    }

    const allValues = form.getValues();
    const result = schema.safeParse(allValues);
    if (!result.success) {
      await form.trigger(fields);
      setIsNavigating(false);
      return;
    }

    await new Promise((r) => setTimeout(r, 200));
    setCurrentStep((s) => s + 1);
    setIsNavigating(false);
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const onSubmit = async (data: FullFormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));

    const username = generateUsername(data.email, data.fullName);
    const temporaryPassword = generateOtp();

    setSuccessData({
      username,
      email: data.email,
      phoneNumber: data.phoneNumber?.trim() || "Not Provided",
      temporaryPassword,
    });
    setDialogOpen(true);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setDialogOpen(false);
    setSuccessData(null);
    setCurrentStep(1);
    form.reset();
  };

  return (
    <>
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="scroll-m-20 text-balance font-extrabold text-3xl tracking-tight">Identity Verification</h1>
          <p className="mt-2 text-base text-muted-foreground">Complete all steps to create your verified account</p>
        </div>

        <nav aria-label="Form steps" className="mb-8">
          <ol className="flex items-start gap-0">
            {STEPS.map((step, index) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;
              return (
                <React.Fragment key={step.id}>
                  <li className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className={cn(
                        "flex size-9 items-center justify-center rounded-full border-2 font-semibold text-sm transition-all duration-200",
                        isCompleted && "border-primary bg-primary text-primary-foreground",
                        isActive && "border-primary bg-background text-primary ring-4 ring-primary/20",
                        !isCompleted && !isActive && "border-border bg-background text-muted-foreground",
                      )}
                    >
                      {isCompleted ? <CheckIcon className="size-4" /> : step.id}
                    </div>
                    <div className="flex flex-col items-center gap-0.5 text-center">
                      <span
                        className={cn(
                          "font-semibold text-xs",
                          isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {step.label}
                      </span>
                      <span className="hidden text-muted-foreground text-xs sm:block">{step.description}</span>
                    </div>
                  </li>
                  {index < STEPS.length - 1 && (
                    <div
                      className={cn(
                        "mt-4 h-0.5 flex-1 self-start transition-all duration-300",
                        currentStep > step.id ? "bg-primary" : "bg-border",
                      )}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </ol>
        </nav>

        <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="min-h-72">
              {currentStep === 1 && <Step1 form={form} />}
              {currentStep === 2 && <Step2 form={form} />}
              {currentStep === 3 && <Step3 form={form} />}
            </div>

            <Separator className="my-6" />

            <div className="flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1 || isNavigating || isSubmitting}
              >
                Back
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">
                  Step {currentStep} of {STEPS.length}
                </span>
                {currentStep < STEPS.length ? (
                  <Button type="button" onClick={handleNext} disabled={isNavigating}>
                    {isNavigating && <Spinner data-icon="inline-start" />}
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Spinner data-icon="inline-start" />}
                    {isSubmitting ? "Creating account…" : "Submit"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <SuccessDialog open={dialogOpen} data={successData} onClose={handleReset} />
    </>
  );
}
