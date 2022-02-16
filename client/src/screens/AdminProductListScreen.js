import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import Message from '../components/Message';
import Loader from '../components/Loader';

import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';

import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const AdminProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, error, products } = useSelector(
    (state) => state.productList
  );

  const {
    loading: createProductLoading,
    error: createProductError,
    success: createProductSuccess,
    product: createdProduct,
  } = useSelector((state) => state.productCreate);

  const { success: successDelete } = useSelector(
    (state) => state.productDelete
  );

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const createHandler = () => {
    dispatch(createProduct());
  };

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate('/login');
    }
    if (createProductSuccess) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
    // dispatch(listProducts());
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    createProductSuccess,
    createdProduct,
  ]);

  return (
    <div className="container px-10 pt-10 pb-20 bg-white">
      <div className="flex flex-col justify-center items-center">
        <h1 className="pb-5 text-2xl font-semibold">Products</h1>

        <button
          onClick={() => createHandler()}
          className="py-1 px-6 mb-6 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200"
        >
          Lyst a Book
        </button>
      </div>

      {successDelete && <Message variant="success">Product deleted.</Message>}
      {createProductError && (
        <Message variant="danger">{createProductError}</Message>
      )}
      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <Message variant="info">
          No products found.{' '}
          <Link to="/" className="underline">
            Lyst a Book
          </Link>
        </Message>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-md sm:rounded-lg">
                  <table className="min-w-full">
                    <thead className="bg-gray-100 dark:bg-gray-700 border-b-2">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Quanity
                        </th>

                        <th scope="col" className="relative py-3 px-6">
                          <span className="sr-only">Edit Product</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr
                          key={product._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {product._id}
                          </td>
                          <td className="py-4 px-6 text-sm font-semibold text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {product.title}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {product.countInStock}
                          </td>
                          {/* <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {product.isAdmin ? (
                              <i
                                className="fas fa-check"
                                style={{ color: '#16a34a' }}
                              ></i>
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: 'red' }}
                              ></i>
                            )}
                          </td> */}

                          <td className="flex py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                            <Link
                              to={`/admin/product/${product._id}/edit`}
                              className="bg-gray-100 hover:bg-gray-200 transion duration-200 p-2 fa-md text-gray-700"
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                            <button
                              to={`/order/${product._id}`}
                              onClick={() => deleteHandler(product._id)}
                              className="p-2 fa-md text-white bg-red-600 hover:bg-red-700 transition duration-200"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProductListScreen;
