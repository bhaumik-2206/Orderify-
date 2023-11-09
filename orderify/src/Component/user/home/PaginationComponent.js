// import React from 'react'
// import ReactPaginate from 'react-paginate';

// function PaginationComponent({handlePageClick,endOffset,currentPage=1}) {
//     return (
//         <div>
//             <div className=' border-gray-200 bg-gray-300 mb-4 py-3 flex flex-wrap sm:px-2 sm:w-fit w-1/2' >
//                 <ReactPaginate
//                     breakLabel={<i className="fa-solid fa-ellipsis fa-lg"></i>}
//                     nextLabel= {<i className="fa-solid fa-chevron-right fa-lg "></i>}
//                     onPageChange={handlePageClick}
//                     pageRangeDisplayed={3}
//                     pageCount={endOffset}
//                     previousLabel={<i className="fa-solid fa-chevron-left fa-lg"></i>}
//                     initialPage={currentPage - 1} 
//                     renderOnZeroPageCount={null}
//                     className=" inline-flex shadow-sm "
//                     activeLinkClassName="bg-blue-400"
//                     previousLinkClassName=" font-bold sm:px-4  p-2 rounded-l-md border border-gray-300 bg-white text-sm sm:text-md text-gray-700 sm:p-3 "
//                     nextLinkClassName='rounded-r-md sm:px-4 p-2  font-bold border border-gray-300 bg-white text-sm sm:text-md text-gray-700 sm:p-3 '
//                     breakLinkClassName=' items-center   p-2  text-sm sm:text-md font-bold text-gray-900 ring-1  ring-gray-300  sm:p-3'
//                     pageLinkClassName="items-center   p-2  text-sm sm:text-md font-bold text-gray-900 ring-1  ring-gray-300  sm:p-3"
//                 />
//             </div>
//         </div>
//     )
// }

// export default PaginationComponent
import React from 'react';
import ReactPaginate from 'react-paginate';

function PaginationComponent({ handlePageClick, endOffset, currentPage = 1 }) {
  return (
    <div className="flex justify-center w-fit">
      <div className="border-gray-200 w-full mb-2 sm:my-4 py-3 ">
        <ReactPaginate
          breakLabel={'...'}
          nextLabel={<i className="fa-solid fa-chevron-right fa-lg "></i>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={1} 
          marginPagesDisplayed={2} 
          pageCount={endOffset}
          previousLabel={<i className="fa-solid fa-chevron-left fa-lg"></i>}
          initialPage={currentPage - 1}
          renderOnZeroPageCount={null}
          className="inline-flex shadow-sm"
          activeLinkClassName="bg-blue-400"
          previousLinkClassName="font-bold sm:px-4 p-2 rounded-l-md border border-gray-300 bg-white text-sm sm:text-md text-gray-700 sm:p-3"
          nextLinkClassName="rounded-r-md sm:px-4 p-2 font-bold border border-gray-300 bg-white text-sm sm:text-md text-gray-700 sm:p-3"
          breakLinkClassName="items-center p-2 text-sm sm:text-md font-bold text-gray-900 ring-1 ring-gray-300 sm:p-3"
          pageLinkClassName="items-center p-2 text-sm sm:text-md font-bold text-gray-900 ring-1 ring-gray-300 sm:p-3"
        />
      </div>
    </div>
  );
}

export default PaginationComponent;

