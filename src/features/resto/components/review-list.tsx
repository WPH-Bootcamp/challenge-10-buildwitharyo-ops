"use client";

import { useState } from "react";
import { Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/shared/rating-stars";
import { formatReviewDate } from "@/lib/format";
import type { RestaurantReview } from "@/types/resto";

const PAGE_SIZE = 6;

interface ReviewListProps {
  reviews: RestaurantReview[];
  averageRating: number;
  totalReviews: number;
}

export function ReviewList({
  reviews,
  averageRating,
  totalReviews,
}: ReviewListProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = reviews.slice(0, visible);

  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold tracking-tight">Review</h2>
        <div className="flex items-center gap-2">
          <Star className="size-5 fill-foreground text-foreground" />
          <span className="font-bold">{averageRating.toFixed(1)}</span>
          <span className="text-muted-foreground">
            ({totalReviews} Ulasan)
          </span>
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground">
          No reviews yet.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {shown.map((review) => (
            <article
              key={review.id}
              className="space-y-3 rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-3">
                <Avatar className="size-11">
                  <AvatarImage
                    src={review.user.avatar ?? undefined}
                    alt={review.user.name}
                  />
                  <AvatarFallback>
                    {review.user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{review.user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatReviewDate(review.createdAt)}
                  </p>
                </div>
              </div>
              <RatingStars value={review.star} />
              <p className="text-sm leading-relaxed text-foreground/90">
                {review.comment}
              </p>
            </article>
          ))}
        </div>
      )}

      {visible < reviews.length && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            className="rounded-full px-8"
            onClick={() => setVisible((count) => count + PAGE_SIZE)}
          >
            Show More
          </Button>
        </div>
      )}
    </section>
  );
}
