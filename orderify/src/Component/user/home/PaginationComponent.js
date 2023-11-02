import React from 'react'
import ReactPaginate from 'react-paginate';

function PaginationComponent({handlePageClick,endOffset}) {
    return (
        <div>
            <div className=' border-gray-200 bg-white px-4 py-3 sm:px-6 w-fit' >
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={endOffset}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className=" inline-flex shadow-sm"
                    activeLinkClassName="bg-red-200"
                    previousLinkClassName=" font-bold rounded-l-md border border-gray-300 bg-white text-sm text-gray-700 p-3 "
                    nextLinkClassName='rounded-r-md font-bold border border-gray-300 bg-white text-sm text-gray-700 p-3 '
                    breakClassName='rounded-md border font-bold border-gray-300 bg-white  text-md  text-gray-700 p-3 '
                    pageLinkClassName="items-center  text-md font-bold text-gray-900 ring-1 ring-inset ring-gray-300  p-3"
                />
            </div>
        </div>
    )
}

export default PaginationComponent