import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoSearch, IoCaretForward, IoCaretBack } from "react-icons/io5";
import Spinner from "../components/Spinner";
import {Helmet} from "react-helmet";

const Transactions = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/transactions/all?month=${month}&page=${currentPage}&search=${search}`
      );
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, month, search]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <Helmet>
        <title>ROXILER Systems-Transactions</title>
      </Helmet>

      <div className="relative">
        <h1 className="text-center py-3 text-4xl font-semibold text-gray-900">
          Transactions
        </h1>
        <div className="md:absolute top-0 m-4 flex justify-center">
          <div className="relative">
            <IoSearch className="absolute top-3 left-2 text-xl text-gray-500" />
            <input
              type="search"
              name="search"
              id="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search..."
              className="border border-gray-400 pl-8 pr-3 py-2 w-[20rem] rounded-full shadow outline-none"
            />
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {transactions.length === 0 ? (
              <div className="text-center font-semibold text-lg my-44">
                Oops!!No Data Found
              </div>
            ) : (
              <>
                <div className="overflow-x-auto md:mx-14 mx-5 my-4 rounded-xl">
                  <table className="min-w-full bg-white border-2 border-gray-200 shadow-md rounded-xl">
                    <thead className="bg-gray-100 text-gray-700 rounded-xl">
                      <tr>
                        <th className="py-3 px-6 text-left font-semibold">
                          ID
                        </th>
                        <th className="py-3 px-6 text-left font-semibold">
                          Title
                        </th>
                        <th className="py-3 px-6 text-left font-semibold">
                          Description
                        </th>
                        <th className="py-3 px-6 text-left font-semibold">
                          Price
                        </th>
                        <th className="py-3 px-6 text-left font-semibold">
                          Category
                        </th>
                        <th className="py-3 px-6 text-left font-semibold">
                          Sold
                        </th>
                        <th className="py-3 px-6 text-left font-semibold">
                          Date of Sale
                        </th>
                        <th className="py-3 px-6 text-left font-semibold">
                          Image
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                      {transactions.map((product) => (
                        <tr
                          key={product._id}
                          className="border-t border-gray-200 hover:bg-gray-50"
                        >
                          <td className="py-3 px-6">{product.id}</td>
                          <td className="py-3 px-6">{product.title}</td>
                          <td className="py-3 px-6" title={product.description}>
                            {product.description.slice(0, 30)}...
                          </td>
                          <td className="py-3 px-6">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="py-3 px-6">{product.category}</td>
                          <td className="py-3 px-6">
                            {product.sold ? "Yes" : "No"}
                          </td>
                          <td className="py-3 px-6">
                            {new Date(product.dateOfSale).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-6">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-12 h-12 object-contain rounded-md"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-center items-center gap-4 my-4">
                  <button
                    disabled={currentPage === 1}
                    onClick={handlePrevious}
                    className="flex items-center bg-primary text-white px-3 py-2 rounded-l-full hover:bg-gray-800 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:opacity-40 "
                  >
                    <IoCaretBack size={22} />
                    <span>Previous</span>
                  </button>

                  <span className="text-lg font-bold border px-4 py-2 rounded-md">
                    {currentPage}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="flex items-center bg-primary text-white pl-5 px-3 py-2 rounded-r-full hover:bg-gray-800 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:opacity-40"
                  >
                    <span>Next</span>
                    <IoCaretForward size={22} />
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Transactions;
