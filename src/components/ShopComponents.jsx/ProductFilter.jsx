import { useContext, useEffect, useState } from "react";
import FilterGroup, { CheckboxOption, NestedFilterGroup } from "./FilterGroup";
import MobileFilterDrawer from "./MobileFilterDrawer";
import { ProductsContainer } from "./ProductsContainer";
import { AllProductDataContext } from "../allProductDataConext/allProductConext";
import { Pagination } from "../Pagination/Pagination";
import ProductGridLoader from "../Loader/ProdcutGridLoader";
import axios from "axios";

export const ProductFilter = () => {
  const { allProducts, products, setProducts, gridLoader } = useContext(AllProductDataContext);

  //  Pagination State 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  //  Range Filter State 
  const [range, setRange] = useState(1000);

  //  Sort Options 
  const sortOptions = [
    { name: "Featured", value: "featured", current: true },
    { name: "Price: Low to High", value: "price-asc", current: false },
    { name: "Price: High to Low", value: "price-desc", current: false },
    { name: "Newest Arrivals", value: "newest", current: false },
  ];

  const [selectSort, setSelectSort] = useState(
    sortOptions.find((option) => option.current)?.value || "featured"
  );

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsMobileDrawerOpen(!isMobileDrawerOpen);

  //  Category Filter State 
  const [selectedCategories, setSelectedCategories] = useState([]);

  //  Handle Sort 
  const handleSort = (e) => {
    const value = e.target.value;
    setSelectSort(value);

    let sortedProducts = [...products];
    if (value === "price-asc") sortedProducts.sort((a, b) => a.price - b.price);
    if (value === "price-desc") sortedProducts.sort((a, b) => b.price - a.price);
    if (value === "newest") sortedProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    setProducts(sortedProducts);
  };

  //  Range Filter 
  const handleInputRange = (e) => {
    const value = Number(e.target.value);
    setRange(value);

    const filtered = allProducts.filter((p) => Number(p.price) <= value);
    setProducts(filtered);
  };

  //  Clear All Filters 
  const handleClearFilters = () => {
    setRange(1000);
    setProducts(allProducts);
    setSelectedCategories([]); 
  };

  //  Category Handler 
  const handleCategoryChange = async (label, checked) => {
    let updatedCategories = [];

    if (checked) {
      updatedCategories = [...selectedCategories, label];
    } else {
      updatedCategories = selectedCategories.filter((cat) => cat !== label);
    }

    setSelectedCategories(updatedCategories);

    if (updatedCategories.length > 0) {
      try {
        const responses = await Promise.all(
          updatedCategories.map((cat) =>
            axios.get(`${import.meta.env.VITE_PRODUCT_URL}/${cat.toLowerCase()}`)
          )
        );
        const merged = responses.flatMap((res) => res.data.products);
        setProducts(merged);

      } catch (err) {
        console.error("Failed to load filtered products:", err);
      }
    } else {
      setProducts(allProducts);
    }
  };

  //  Filter UI Content 
  const FilterContent = (
    <>
      <FilterGroup title="Category" isCollapsible={true}>
        <NestedFilterGroup title="Clothes" isOpenInitially={true}>
          <div className="space-y-2">
            {[
              "Tops",
              "Jackets",
              "T Shirts",
              "Sweat wear",
              "Pants",
              "Denim",
              "Active Wear",
              "Browse All",
            ].map((cat) => (
              <CheckboxOption
                key={cat}
                id={`cat-${cat}`}
                label={cat}
                count={products.length}
                selectedCategories={selectedCategories}
                onChange={handleCategoryChange}
              />
            ))}
          </div>
        </NestedFilterGroup>

        <NestedFilterGroup title="Accessories">
          <div className="space-y-2">
            {["Watches", "Wallets", "Bags", "Sunglass", "Hats", "Belts"].map((cat) => (
              <CheckboxOption
                key={cat}
                id={`acc-${cat}`}
                label={cat}
                count={products.length}
                selectedCategories={selectedCategories}
                onChange={handleCategoryChange}
              />
            ))}
          </div>
        </NestedFilterGroup>
      </FilterGroup>

      <FilterGroup title="Price Range">
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <p className="font-medium text-gray-700">$0</p>
            <p className="font-medium text-indigo-600">${range}</p>
            <p className="font-medium text-gray-700">$1000</p>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            value={range}
            onChange={handleInputRange}
            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
          />
        </div>
      </FilterGroup>
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter & Sort */}
        <div className="lg:hidden flex justify-between items-center w-full mb-4">
          <button
            onClick={toggleDrawer}
            className="w-10 h-10 p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition duration-150 shadow-sm flex items-center justify-center font-medium border border-gray-300"
          >
            {/* Filter Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h18v2H3zM3 11h18v2H3zM3 18h18v2H3z" />
            </svg>
          </button>

          <div className="relative w-40">
            <select
              id="mobile-sort-by"
              name="mobile-sort-by"
              value={selectSort}
              onChange={handleSort}
              className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block w-full lg:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 sticky top-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Refine Search</h3>
            {FilterContent}
            <div className="pt-4 border-t mt-4">
              <button
                onClick={handleClearFilters}
                className="w-full text-sm font-medium text-red-600 hover:text-red-700 transition duration-150"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Filter Drawer */}
        <MobileFilterDrawer isOpen={isMobileDrawerOpen} onClose={toggleDrawer}
        handleClearFilters={handleClearFilters}>
          {FilterContent}
        </MobileFilterDrawer>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h2 className="text-xl font-bold text-gray-800 hidden lg:block">
                Product Results ({products.length})
              </h2>

              {/* Desktop Sort Dropdown */}
              <div className="relative hidden lg:block">
                <select
                  id="desktop-sort-by"
                  name="desktop-sort-by"
                  value={selectSort}
                  onChange={handleSort}
                  className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {gridLoader ? (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ProductGridLoader />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 min-h-64 p-1">
                <ProductsContainer products={currentProducts} />
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
