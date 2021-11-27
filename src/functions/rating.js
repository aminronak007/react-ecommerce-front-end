import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    // console.log("l", length);

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    // console.log("t", totalReduced);

    let highest = length * 5;
    // console.log("h", highest);

    let result = (totalReduced * 5) / highest;
    // console.log("r", result);

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="orange"
            editing={false}
            rating={result}
          />
          &nbsp;({p.ratings.length})
        </span>
      </div>
    );
  }
};
