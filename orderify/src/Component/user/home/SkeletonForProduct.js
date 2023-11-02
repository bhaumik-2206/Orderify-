import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonForProduct({ count }) {
  return (
    <div className="m-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="w-52 m-2">
            <div>
              <div className="w-full">
                <Skeleton className="h-64 " />
              </div>
              <div className="">
                <Skeleton className="h-14 my-2" />
              </div>
            </div>
            <div className="">
              <Skeleton className="h-10" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default SkeletonForProduct;