import PropTypes from "prop-types";
import { StarIcon } from "lucide-react";

StarRating.propTypes = {
    rating: PropTypes.number,
    handleRatingChange: PropTypes.func,
}

function StarRating({ rating, handleRatingChange }) {
    return [1, 2, 3, 4, 5].map((star) => (
        <div
            key={star}
            className={
                `p-2 rounded-full transition-colors cursor-pointer
                ${star <= rating ? "text-yellow-500 hover:bg-black" : "text-black hover:bg-primary hover:text-primary-foreground"}`
            }
            onClick={handleRatingChange ? () => handleRatingChange(star) : null}
        >
            <StarIcon className={`w-6 h-6 ${star <= rating ? "fill-yellow-500" : "fill-black"}`} />
        </div>
    ));
}

export default StarRating;