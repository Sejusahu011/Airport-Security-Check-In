import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Upload Documents" },
  { number: 2, label: "Capture Selfie" },
  { number: 3, label: "Verification" },
  { number: 4, label: "Results" },
];

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="w-full bg-card border-b border-border px-4 md:px-8 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold text-sm md:text-base transition-all",
                    currentStep > step.number
                      ? "bg-primary text-primary-foreground"
                      : currentStep === step.number
                      ? "bg-primary text-primary-foreground scale-110"
                      : "bg-muted text-muted-foreground"
                  )}
                  data-testid={`step-indicator-${step.number}`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <p
                  className={cn(
                    "mt-2 text-xs md:text-sm font-medium text-center hidden sm:block",
                    currentStep >= step.number
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2 transition-colors",
                    currentStep > step.number
                      ? "bg-primary"
                      : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
