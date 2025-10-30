import { useNavigate } from "react-router-dom";
export const ProductsContainer = ({products =[]}) =>{
   const navigate = useNavigate();  
  return(
     
      <>   
      {products.map((product) => (
            <div  key={product.id} onClick={() => navigate(`/productdetails/${product.id}`)}
              className="bg-gray-50  shadow-md hover:shadow-lg transition p-4 flex flex-col"
            >
              {/* Product Image */}
              <div className="w-full h-48 overflow-hidden mb-4">
                <img
                  loading="lazy"
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <h3 className="text-lg font-semibold text-gray-800 truncate mb-1 text-left">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 truncate text-left">{product.category}</p>

              {/* Price Section */}
              <div className="mt-2">
                {product.discount > 0 ? (
                  <div className="flex flex-col md:flex-row  items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                    <span className="text-sm text-red-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>                    
                  </div>
                ) : (
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Badges for Stock, Size, Discount */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  Stock: {product.stock}
                </span>
                {product.discount > 0 && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>
          ))} </>

    )
}