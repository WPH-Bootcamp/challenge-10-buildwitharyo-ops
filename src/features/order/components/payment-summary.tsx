import { formatRupiah } from "@/lib/format";

interface PaymentSummaryProps {
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
}

export function PaymentSummary({
  itemCount,
  subtotal,
  deliveryFee,
  serviceFee,
  total,
}: PaymentSummaryProps) {
  return (
    <div className="space-y-3">
      <p className="font-bold">Payment Summary</p>
      <SummaryRow label={`Price (${itemCount} items)`} value={subtotal} />
      <SummaryRow label="Delivery Fee" value={deliveryFee} />
      <SummaryRow label="Service Fee" value={serviceFee} />
      <div className="flex items-center justify-between border-t border-dashed border-border pt-3 text-base font-bold">
        <span>Total</span>
        <span>{formatRupiah(total)}</span>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{formatRupiah(value)}</span>
    </div>
  );
}
