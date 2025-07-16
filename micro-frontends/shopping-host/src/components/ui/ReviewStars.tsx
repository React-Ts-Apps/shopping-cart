import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';


const ReviewStars = ({ ratings, handleClick }: { ratings: number, handleClick?: (ratings: number) => void }) => {
    const stars = []
    const fullStars = Math.floor(ratings)
    const hasHalfStar = (ratings - fullStars) >= 0.5

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<FaStar key={i} onClick={handleClick ? () => handleClick(i) : undefined} className='text-yellow-500' />);
        } else if (i === fullStars && hasHalfStar) {
            stars.push(<FaStarHalfAlt key={i} className='text-yellow-500' />)
        } else {
            stars.push(<FaRegStar key={i} onClick={handleClick ? () => handleClick(i + 1) : undefined} className='text-yellow-300' />)
        }
    }
    return <div className='flex'>{stars}</div>

}
export default ReviewStars