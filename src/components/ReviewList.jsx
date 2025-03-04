import ReviewCard from '@/components/ReviewCard';

const ReviewList = ({ reviews }) => {
  return (
    <div className='flex flex-col gap-4'>
      {reviews.length > 0 ? (
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};

export default ReviewList;
