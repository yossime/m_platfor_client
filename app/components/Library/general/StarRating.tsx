import React, { useState } from 'react';
import styled from 'styled-components';
import { Star } from 'lucide-react';

interface StyledStarProps {
  $active: boolean;
}

const StyledStar = styled(Star)<StyledStarProps>`
  cursor: pointer;
  transition: color 0.2s;
  color: ${props => props.$active ? 'gold' : 'gray'};
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

interface StarRatingProps {
  totalStars?: number;
  onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars = 5, onChange }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  const handleRating = (value: number) => {
    setRating(value);
    onChange?.(value);
  };

  return (
    <RatingContainer>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <StyledStar
            key={index}
            $active={starValue <= (hover || rating)}
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          />
        );
      })}
    </RatingContainer>
  );
};

export default StarRating;

// Usage example:
// <StarRating onChange={(rating) => console.log(`Rated ${rating} stars`)} />