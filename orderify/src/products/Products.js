import React, { useEffect, useState } from 'react';
import fetchApi from '../util/helper';

function Products() {
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState([]);
    const [quntity,setQuntity] = useState(1)
    const token = localStorage.getItem('auth');
    const customHeaders = {
        'Auth': token,
    };

    const fetchData = async () => {
        try {
            const response = await fetchApi('products', 'GET', null, customHeaders);
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addItem = (productId) => {
        if (!order.some(item => item.id === productId)) {
            setOrder([...order, { id: productId }]);
        }
    };
    console.log(order)
    // const removeItem = (productId) => {
    //     const updatedOrder = order.filter(item => item.id !== productId);
    //     setOrder(updatedOrder);
    // };

    return (
        <ul role="list" className="divide-y divide-gray-100">
            {products.map((product) => (
                <li key={product._id} className="flex justify-between gap-x-6 py-5 p-3">
                    <div className="flex min-w-0 gap-x-4">
                        <p className="text-xl font-semibold leading-6 text-gray-900">{product.prd_name}</p>
                    </div>
                    <div className="block shrink-0 sm:flex sm:flex-col sm:items-center">
                        <div className='flex items-center'>
                            <p className="leading-6 text-gray-900 text-xl text-center p-1">Price</p>
                            <select name="price" id="" className='border-2 rounded-md p-1'>
                                {product.prd_price.map((price, index) => (
                                    <option key={index} value="">{price}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="block shrink-0 sm:flex sm:flex-col sm:items-end">
                        <div className="flex items-center justify-center bg-gray-300 rounded-md p-1">
                            {order.some(item => item.id === product._id) ? (
                                <>
                                    <button id="incrementButton" className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md mr-4"
                                    onClick={()=>setQuntity((pre)=>pre+1)}>+</button>
                                    <p id="counter" className="text-xl font-semibold">{quntity}</p>
                                    <button id="decrementButton" className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md ml-4"
                                    onClick={()=>{
                                        if(quntity!=0){
                                            setQuntity((pre)=>pre-1)
                                        }
                                    }}>-</button>
                                </>
                            ) : (
                                <button onClick={() => addItem(product._id)}>Add Item</button>
                            )}
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default Products;



// function Products() {
//     const [products, setProducts] = useState([])
//     const token = localStorage.getItem('auth')
//     const [order, setOrder] = useState([{}])
//     // console.log(token)
//     const customHeaders = {
//         'Auth': token,

//     };
//     const fetchData = async () => {
//         // fetch("https://orderify-qebp.onrender.com/products", {
//         //     method: 'GET',
//         //     headers: {
//         //         'Auth': token,
//         //     }
//         // })
//         //     .then((response) => response.json())
//         //     .then((result) => setProducts(result.data))
//         try {
//             const responce = await fetchApi('products', 'GET', null, customHeaders);
//             setProducts(responce.data)
//             // console.log(responce);
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     useEffect(() => {
//         fetchData();
//     }, [])

//     console.log(order)
//     return (
//         <ul role="list" className="divide-y divide-gray-100">
//             {products.map((product) => (
//                 <li key={product._id} className="flex justify-between gap-x-6 py-5 p-3">
//                     <div className="flex min-w-0 gap-x-4">
//                         {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={product.url} alt="" /> */}
//                         <p className="text-xl font-semibold leading-6 text-gray-900 ">{product.prd_name}</p>
//                         <div className="min-w-0 flex-auto">
//                             {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">{product.email}</p> */}
//                         </div>
//                     </div>
//                     <div className="block shrink-0 sm:flex sm:flex-col sm:items-center ">
//                         <div className='flex items-center'>
//                             <p className=" leading-6 text-gray-900 text-xl text-center p-1">Price</p>
//                             <select name="price" id="" className='border-2 rounded-md p-1'>
//                                 {
//                                     product.prd_price.map((price, index) => (
//                                         <option key={index} value="">{price}</option>

//                                     ))
//                                 }
//                             </select>
//                         </div>
//                     </div>
//                     <div className="block shrink-0 sm:flex sm:flex-col sm:items-end">
//                         <div className="flex items-center justify-center bg-gray-300 rounded-md p-1">

//                             {
//                                 order.map((item) => (
//                                     <>
//                                         <button onClick={() => setOrder([...order, { id: product._id }])}>Add Item</button>
//                                         <div className={item.id===product._id ? "block" : "hidden" }>
//                                             <button id="incrementButton" className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md mr-4">+</button>
//                                             <p id="counter" className="text-xl font-semibold">0</p>
//                                             <button id="decrementButton" className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md ml-4">-</button>
//                                         </div>
//                                     </>
//                                 ))
//                             }


//                         </div>
//                     </div>
//                 </li>
//             ))}
//         </ul>
//         // <div className="bg-white">
//         //     <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//         //         <h2 className="sr-only">Products</h2>
//         //         <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//         //             {products.map((product) =>
//         //             (
//         //                 <div key={product.id} className="group">
//         //                     <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">

//         //                     </div>
//         //                     <h3 className="mt-4 text-sm text-gray-700 p-2">{product.prd_name}</h3>
//         //                     <div className='flex'>
//         //                         {
//         //                             product.prd_price.map((price) => (
//         //                                 <p className="mt-1 text-lg font-medium text-gray-900 p-2">{price}</p>
//         //                             ))
//         //                         }
//         //                     </div>

//         //                 </div>
//         //             )
//         //                 // (
//         //                 //     <div key={product.id} href={product.href} className="group">
//         //                 //         <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
//         //                 //             {/* <img
//         //                 //                 src={product.imageSrc}
//         //                 //                 alt={product.imageAlt}
//         //                 //                 className="h-full w-full object-cover object-center group-hover:opacity-75"
//         //                 //             /> */}
//         //                 //         </div>
//         //                 //         <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
//         //                 //         <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
//         //                 //     </div>
//         //                 // )
//         //             )}
//         //         </div>
//         //     </div>
//         // </div>
//     )
// }

// export default Products