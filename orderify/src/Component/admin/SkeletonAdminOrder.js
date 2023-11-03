import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


function SkeletonAdminOrder({ count }) {
    return (
        <div className=' max-w-7xl mx-auto'>
            {Array(count)
                .fill(0)
                .map((_, index) => (
                    <div key={index} className='flex justify-between'>
                        <div className='flex justify-between'>
                            <div>
                                <Skeleton width={150} height={180} />
                            </div>
                            <div>
                                <Skeleton className='m-2' width={250} height={20} />
                                <Skeleton className='m-2' width={100} height={20} />
                                <Skeleton className='m-2' width={100} height={20} />
                            </div>
                        </div>
                        <div >
                            < Skeleton className='m-2 mb-5' width={150} height={20} />
                            <Skeleton className='m-2 mt-5' width={150} height={20} />
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default SkeletonAdminOrder
