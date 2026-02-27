import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckoutStepperProps {
  currentStep: number;
  steps: string[];
}

export default function CheckoutStepper({ currentStep, steps }: CheckoutStepperProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                i < currentStep
                  ? "bg-forest text-white"
                  : i === currentStep
                  ? "bg-terracotta text-white"
                  : "bg-stone/15 text-stone"
              )}
            >
              {i < currentStep ? (
                <Check className="h-4 w-4" strokeWidth={2} />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={cn(
                "mt-1.5 text-xs font-medium whitespace-nowrap",
                i <= currentStep ? "text-charcoal" : "text-stone"
              )}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "h-0.5 w-12 sm:w-20 mx-2 rounded-full mt-[-18px]",
                i < currentStep ? "bg-forest" : "bg-stone/15"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
