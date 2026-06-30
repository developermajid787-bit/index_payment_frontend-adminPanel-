"use client";

import * as React from "react";

import { CheckCircle2Icon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface AccountData {
  username: string;
  email: string;
  phoneNumber: string;
  temporaryPassword: string;
}

interface SuccessDialogProps {
  open: boolean;
  data: AccountData | null;
  onClose: () => void;
}

function DataRow({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex flex-col gap-0.5">
        <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">{label}</span>
        <span className={cn("font-medium text-sm", mono && "font-mono")}>{value}</span>
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleCopy}
        title={`Copy ${label}`}
        className="shrink-0 text-muted-foreground hover:text-foreground"
      >
        <CopyIcon className="size-3.5" />
        <span className="sr-only">{copied ? "Copied!" : `Copy ${label}`}</span>
      </Button>
    </div>
  );
}

export function SuccessDialog({ open, data, onClose }: SuccessDialogProps) {
  if (!data) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2Icon className="size-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">Account Created Successfully</DialogTitle>
          <DialogDescription className="text-center">
            Your account has been set up. Save your credentials securely — your temporary password will expire after
            first login.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="flex flex-col gap-4">
            <DataRow label="Username" value={data.username} />
            <Separator />
            <DataRow label="Email" value={data.email} />
            <Separator />
            <DataRow label="Phone Number" value={data.phoneNumber} />
            <Separator />
            <DataRow label="Temporary Password" value={data.temporaryPassword} mono />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Close &amp; Reset Form
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
