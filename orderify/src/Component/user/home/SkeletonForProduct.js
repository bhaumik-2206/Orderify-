import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonForProduct({ count }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-6">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="w-30 sm:w-52 mx-3 sm:m-2">
            <div>
              <div className="w-full">
                <Skeleton className="sm:h-64 h-48" />
              </div>
              <div className="">
                <Skeleton className="sm:h-14 h-7 sm:my-2" />
              </div>
            </div>
            <div className="">
              <Skeleton className="h-3 sm:h-10" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default SkeletonForProduct;