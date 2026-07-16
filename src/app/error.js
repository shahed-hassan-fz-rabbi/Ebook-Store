"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

import Button from "@/components/ui/Button";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/10">
          <AlertTriangle className="h-9 w-9 text-danger" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-text">
          Something went wrong
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          An unexpected error occurred. Try again, or head back home.
        </p>

        <div className="mt-8 flex justify-center">
          <Button onClick={reset}>
            <RotateCcw className="h-4 w-4" /> Try again
          </Button>
        </div>
      </div>
    </div>
  );
}