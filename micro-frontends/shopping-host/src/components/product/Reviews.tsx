import type { ReviewProps } from "../../types"
import ReviewStars from "../ui/ReviewStars"

type ReviewsDisplayProps = ReviewProps & {
    user: {
        name: string
    },
    _id: string
}
const Reviews = ({ reviews }: { reviews: ReviewsDisplayProps[] }) => {
    if (reviews.length === 0) return null;

    return (
        <div className="w-full max-w-2xl mx-auto mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h3>
            <hr className="border-t border-gray-200 mb-6" />

            {reviews.map((review) => (
                <div
                    key={review._id}
                    className="bg-white shadow-md rounded-xl p-5 mb-6 transition hover:shadow-lg"
                >
                    {/* Single horizontal row for stars, name, and date */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2 flex-wrap">
                        <ReviewStars ratings={review.rating} />

                        <span className="font-semibold text-gray-400">{review.user?.name || 'Anonymous'}</span>

                        <span className="text-gray-400 text-xs">
                            · {new Date(review.date).toLocaleDateString('en-GB', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </span>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed">
                        {review.comment}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Reviews