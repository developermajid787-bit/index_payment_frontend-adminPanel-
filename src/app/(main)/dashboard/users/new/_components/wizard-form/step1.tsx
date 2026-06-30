"use client";

import { useCallback, useRef, useState } from "react";

import {
  AlertCircleIcon,
  FileImageIcon,
  UploadCloudIcon,
  XCircleIcon,
} from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

import type { FullFormData } from "./schema";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface Step1Props {
  form: UseFormReturn<FullFormData>;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
}

export function Step1({ form }: Step1Props) {
  const { control, setValue, watch } = form;
  const currentFile = watch("nationalIdImage");
  const [isDragActive, setIsDragActive] = useState(false);
  const [dragReject, setDragReject] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      setValue("nationalIdImage", file, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue]
  );

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const items = Array.from(e.dataTransfer.items);
    const isWebp = items.every((item) => item.type === "image/webp");
    setIsDragActive(true);
    setDragReject(!isWebp);
  };

  const onDragLeave = () => {
    setIsDragActive(false);
    setDragReject(false);
  };

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragActive(false);
      setDragReject(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const clearFile = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setValue("nationalIdImage", undefined as unknown as File, {
        shouldValidate: false,
        shouldDirty: true,
        shouldTouch: false,
      });
    },
    [setValue]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-xl tracking-tight">
          National ID Image
        </h2>
        <p className="text-muted-foreground text-sm">
          Upload a clear photo of your National ID. Only WebP format is accepted
          (max 5 MiB).
        </p>
      </div>

      <Controller
        name="nationalIdImage"
        control={control}
        render={({ fieldState }) => {
          const isInvalid = fieldState.invalid;
          const isValid = currentFile instanceof File && !isInvalid;
          const isSizeError =
            currentFile instanceof File && currentFile.size > MAX_FILE_SIZE;
          const isFormatError =
            currentFile instanceof File && currentFile.type !== "image/webp";

          return (
            <Field data-invalid={isInvalid || undefined}>
              <FieldLabel>National ID Photo</FieldLabel>

              <div
                tabIndex={0}
                aria-label="Upload National ID image"
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    inputRef.current?.click();
                }}
                className={cn(
                  "group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-10 text-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  !isDragActive &&
                    !isInvalid &&
                    !isValid &&
                    "border-border hover:border-primary/50 hover:bg-accent/40",
                  isValid && "border-primary bg-primary/5",
                  isDragActive &&
                    !dragReject &&
                    "scale-[1.01] border-primary bg-primary/5",
                  (isInvalid || (isDragActive && dragReject)) &&
                    "border-destructive bg-destructive/5"
                )}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/webp"
                  className="sr-only"
                  aria-invalid={isInvalid}
                  onChange={onInputChange}
                />

                {currentFile instanceof File ? (
                  <>
                    <div
                      className={cn(
                        "flex size-14 items-center justify-center rounded-full",
                        isInvalid ? "bg-destructive/10" : "bg-primary/10"
                      )}
                    >
                      {isInvalid ? (
                        <AlertCircleIcon className="size-7 text-destructive" />
                      ) : (
                        <FileImageIcon className="size-7 text-primary" />
                      )}
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <p
                        className={cn(
                          "font-medium text-sm",
                          isInvalid ? "text-destructive" : "text-foreground"
                        )}
                      >
                        {currentFile.name}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
                        <span
                          className={cn(
                            isSizeError && "font-semibold text-destructive"
                          )}
                        >
                          {formatBytes(currentFile.size)}
                          {isSizeError && " — too large"}
                        </span>
                        <span>·</span>
                        <span
                          className={cn(
                            isFormatError && "font-semibold text-destructive"
                          )}
                        >
                          {currentFile.type || "unknown type"}
                          {isFormatError && " — not WebP"}
                        </span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-xs">
                      Click to replace
                    </p>

                    <button
                      type="button"
                      onClick={clearFile}
                      className="absolute top-3 right-3 rounded text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <XCircleIcon className="size-5" />
                      <span className="sr-only">Remove file</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div
                      className={cn(
                        "flex size-14 items-center justify-center rounded-full transition-colors",
                        isDragActive && dragReject
                          ? "bg-destructive/10"
                          : isDragActive
                          ? "bg-primary/10"
                          : "bg-muted"
                      )}
                    >
                      <UploadCloudIcon
                        className={cn(
                          "size-7 transition-colors",
                          isDragActive && dragReject
                            ? "text-destructive"
                            : isDragActive
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-sm">
                        {isDragActive && dragReject
                          ? "Only WebP files are accepted"
                          : isDragActive
                          ? "Drop your file here"
                          : "Drag & drop or click to upload"}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        WebP format only · Max 5 MiB
                      </p>
                    </div>
                  </>
                )}
              </div>

              {isInvalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
    </div>
  );
}
