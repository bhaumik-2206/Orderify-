import React from 'react'
import ReactPaginate from 'react-paginate';

function PaginationComponent({handlePageClick,endOffset}) {
    return (
        <div>
            <div className=' border-gray-200 bg-white px-4 py-3 sm:px-6 w-fit' >
                <ReactPaginate
                    breakLabel={<i className="fa-solid fa-ellipsis fa-lg"></i>}
                    nextLabel= {<i className="fa-solid fa-chevron-right fa-lg "></i>}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={endOffset}
                    previousLabel={<i className="fa-solid fa-chevron-left fa-lg"></i>}
                    renderOnZeroPageCount={null}
                    className=" inline-flex shadow-sm"
                    activeLinkClassName="bg-blue-400"
                    previousLinkClassName=" font-bold px-4 rounded-l-md border border-gray-300 bg-white text-md text-gray-700 p-3 "
                    nextLinkClassName='rounded-r-md px-4 font-bold border border-gray-300 bg-white text-md text-gray-700 p-3 '
                    breakLinkClassName=' items-center  text-md font-bold text-gray-900 ring-1  ring-gray-300  p-3'
                    pageLinkClassName="items-center  text-md font-bold text-gray-900 ring-1  ring-gray-300  p-3"
                />
            </div>
        </div>
    )
}

export default PaginationComponent