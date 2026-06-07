"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PAYMENT_METHODS } from "@/constants/payment-methods";

interface PaymentMethodListProps {
  value: string;
  onChange: (value: string) => void;
}

export function PaymentMethodList({ value, onChange }: PaymentMethodListProps) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="gap-0">
      {PAYMENT_METHODS.map((method, index) => (
        <label
          key={method.value}
          className="flex cursor-pointer items-center justify-between gap-3 py-3"
          style={{
            borderTop: index === 0 ? undefined : "1px solid var(--border)",
          }}
        >
          <span className="flex items-center gap-3">
            <span className="grid h-8 w-12 place-items-center rounded-md border border-border text-[10px] font-bold text-muted-foreground">
              {method.short}
            </span>
            <span className="text-sm font-medium">{method.name}</span>
          </span>
          <RadioGroupItem value={method.value} />
        </label>
      ))}
    </RadioGroup>
  );
}
