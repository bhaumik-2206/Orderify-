import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonForOrder({ count }) {
    return (
        <div className=' max-w-7xl mx-auto'>

            <Skeleton className='my-2' width={300} height={30} />
            <div className=''>
                <div className="grid grid-cols-2 justify-between">
                    {Array(count)
                        .fill(0)
                        .map((_, index) => (
                            <div key={index} className='flex'>
                                <div>
                                    <Skeleton width={150} height={180} />
                                </div>
                                <div>
                                    <Skeleton className='m-2' width={250} height={20} />
                                    <Skeleton className='m-2' width={100} height={20} />
                                    <Skeleton className='m-2' width={100} height={20} />
                                    <Skeleton className='mt-5 mx-2' width={100} height={20} />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default SkeletonForOrder
