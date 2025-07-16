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
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600 font-medium">
                            {review.user?.name || 'Anonymous'}
                        </p>
                        <p className="text-xs text-gray-400">
                            {new Date(review.date).toLocaleString('en-GB', {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                            })}
                        </p>
                    </div>

                    <div className="flex items-center mb-2">
                        <ReviewStars ratings={review.rating} />
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed">
                        {review.comment}
                    </p>
                </div>
            ))}
        </div>
    );
}
export default Reviews