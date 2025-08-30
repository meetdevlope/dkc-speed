import { ProductReview } from "types/product.types";

export interface RatingBarData {
  rating: number;
  percentage: number;
}

export const generateRatingBarData = (reviews: ProductReview[]) => {
  if (reviews.length === 0 || !Array.isArray(reviews)) {
    return [
      { rating: 5, percentage: 0 },
      { rating: 4, percentage: 0 },
      { rating: 3, percentage: 0 },
      { rating: 2, percentage: 0 },
      { rating: 1, percentage: 0 },
    ];
  }

  const ratingCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  reviews.forEach((review) => {
    const rating = Math.round(review.ratings);
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating]++;
    }
  });

  const totalReviews = reviews.length;
  const ratingBars: RatingBarData[] = [];

  for (let rating = 5; rating >= 1; rating--) {
    const count = ratingCounts[rating];
    const percentage = Math.round((count / totalReviews) * 100);
    ratingBars.push({ rating, percentage });
  }

  return ratingBars.reverse();
};

export const generateAverageRating = (reviews: ProductReview[]): number => {
  if (!Array.isArray(reviews) || reviews?.length < 1) return 0;

  if (reviews.length < 1) return 0;

  const sum = reviews.reduce((total, review) => total + review.ratings, 0);
  const average = sum / reviews.length;

  return Math.round(average * 10) / 10;
};
