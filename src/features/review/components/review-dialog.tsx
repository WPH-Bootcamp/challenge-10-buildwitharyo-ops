"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useCreateReview } from "../hooks/use-create-review";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionId: string;
  restaurantId: number;
  menuIds: number[];
}

export function ReviewDialog({
  open,
  onOpenChange,
  transactionId,
  restaurantId,
  menuIds,
}: ReviewDialogProps) {
  const [star, setStar] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const createReview = useCreateReview();

  function reset() {
    setStar(0);
    setHover(0);
    setComment("");
  }

  function handleSubmit() {
    if (star < 1) {
      toast.error("Please give a rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please share your thoughts");
      return;
    }
    createReview.mutate(
      { transactionId, restaurantId, star, comment: comment.trim(), menuIds },
      {
        onSuccess: () => {
          reset();
          onOpenChange(false);
        },
      },
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold">
            Give Review
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2 text-center">
            <p className="font-bold">Give Rating</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onMouseEnter={() => setHover(value)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setStar(value)}
                  aria-label={`${value} star`}
                >
                  <Star
                    className={cn(
                      "size-9 transition-colors",
                      (hover || star) >= value
                        ? "fill-foreground text-foreground"
                        : "fill-muted text-muted-foreground/40",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Please share your thoughts about our service!"
            rows={5}
            className="w-full resize-none rounded-xl border border-border p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          />

          <Button
            variant="dark"
            onClick={handleSubmit}
            disabled={createReview.isPending}
            className="h-12 w-full rounded-full"
          >
            {createReview.isPending ? "Sending…" : "Send"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
