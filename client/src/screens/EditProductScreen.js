import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';

import Message from '../components/Message';
import Loader from '../components/Loader';

import {
  listNewProductDetails,
  updateProduct,
} from '../actions/productActions';

import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const EditProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [isbn, setIsbn] = useState('');
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [uploading, setUploading] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.productUpdate);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        _id: id,
        title,
        author,
        image,
        isbn,
        language,
        genre,
        condition,
        price,
        countInStock: qty,
      })
    );
  };

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate('/');
    }

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/products');
    } else {
      if (!product.title || product._id !== id) {
        dispatch(listNewProductDetails(id));
      } else {
        setImage(product.image);
        setTitle(product.title);
        setAuthor(product.author);
        setIsbn(product.isbn);
        setLanguage(product.language);
        setGenre(product.genre);
        setCondition(product.condition);
        setPrice(product.price);
        setQty(product.countInStock);
      }
    }
  }, [
    userInfo,
    navigate,
    dispatch,
    id,
    successUpdate,
    product.title,
    product.image,
    product._id,
    product.author,
    product.language,
    product.isbn,
    product.genre,
    product.condition,
    product.price,
    product.countInStock,
  ]);

  return (
    <div className="container">
      <Link
        to="/admin/products"
        className="underline font-semibold text-blue-600 ml-2 text-sm"
      >
        Go Back
      </Link>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <form action="submit" onSubmit={handleSubmit}>
          <div className="px-10 md:16 lg:px-36 flex flex-col space-y-5 ">
            <div className="bookCover">
              <h1 className="text-2xl font-bold text-center mb-5">
                Book Cover
              </h1>

              <div className="flex flex-col md:px-28">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 "
                  htmlFor="image"
                >
                  Image
                </label>
                <input
                  type="text"
                  id="image"
                  value={image}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => setImage(e.target.value)}
                />
                <input
                  type="file"
                  id="image-file"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                  onChange={uploadFileHandler}
                />
                {uploading && <Loader />}
              </div>
            </div>

            <hr className="bg-gray-100" />

            <div className="bookDetails">
              <h1 className="text-2xl font-bold text-center mb-5">
                Book Details
              </h1>

              <div className="formContainer flex flex-col space-y-4">
                <div className="grid gird-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 "
                      htmlFor="title"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Enter title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 "
                      htmlFor="author"
                    >
                      Author
                    </label>
                    <input
                      type="text"
                      id="author"
                      value={author}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Enter author"
                      required
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gird-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <div className="flex space-x-2 items-center">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 "
                        htmlFor="isbn"
                      >
                        ISBN
                      </label>

                      <button
                        data-tooltip-target="tooltip-light"
                        data-tooltip-style="light"
                        type="button"
                        className="text-blue-600 pb-1"
                      >
                        <i className="fa fa-circle-question"></i>
                      </button>
                      <div
                        id="tooltip-light"
                        role="tooltip"
                        className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-blue-600 rounded-lg border border-gray-200 shadow-sm opacity-0 tooltip"
                      >
                        The ISBN is printed on the lower portion of the back
                        cover of a book above the bar code.
                        <div className="-arrow" data-popper-arrow></div>
                      </div>
                    </div>

                    <input
                      type="text"
                      id="isbn"
                      value={isbn}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Enter ISBN"
                      required
                      onChange={(e) => setIsbn(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 "
                      htmlFor="language"
                    >
                      Language
                    </label>
                    <input
                      type="text"
                      id="language"
                      value={language}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Enter language"
                      required
                      onChange={(e) => setLanguage(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gird-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 "
                      htmlFor="genres"
                    >
                      Genre
                    </label>
                    <select
                      id="genres"
                      value={genre}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      onChange={(e) => setGenre(e.target.value)}
                    >
                      <option>Select Genre</option>
                      <option>Fantasy</option>
                      <option>Adventure</option>
                      <option>Romance</option>
                      <option>Mystery</option>
                      <option>Horror</option>
                      <option>Thriller</option>
                      <option>Historical Fiction</option>
                      <option>Science Fiction</option>
                      <option>Literary Fiction</option>
                      <option>Memoir</option>
                      <option>Biography</option>
                      <option>Self-help / Personal</option>
                      <option>History</option>
                      <option>Health</option>
                      <option>Families & Relationships</option>
                    </select>
                  </div>

                  <div className="flex flex-col pb-5">
                    <label
                      htmlFor="condition"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Condition
                    </label>
                    <select
                      id="condition"
                      value={condition}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      onChange={(e) => setCondition(e.target.value)}
                    >
                      <option>Select Condition</option>
                      <option>Like New</option>
                      <option>Very Good</option>
                      <option>Good</option>
                      <option>Fair</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <hr className="gray-400" />

            <div className="priceAndQty">
              <h1 className="text-2xl font-bold text-center mb-5">
                Price and Quanity
              </h1>

              <div className="grid grid-cols-2 gap-6 md:px-28">
                <div className="flex flex-col">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    required
                    value={price}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="flex flex-col pb-5">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                    htmlFor="countInStock"
                  >
                    Quanity
                  </label>
                  <input
                    type="number"
                    id="countInStock"
                    value={qty}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter quanity"
                    onChange={(e) => setQty(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-md text-white font-semibold py-2 mx-10 md:mx-36"
            >
              Lyst Book
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProductScreen;
