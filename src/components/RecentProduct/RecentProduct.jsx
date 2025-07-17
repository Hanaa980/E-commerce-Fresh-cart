import { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import ProductItem from './../ProductItem/ProductItem';
import { GridLoader } from 'react-spinners';

export default function RecentProduct({ count }) {
  const [loader, setLoader] = useState(true)
  const [products, setProducts] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [shuffledProducts, setShuffledProducts] = useState([]);

  function setSearchVal(value) {
    setSearchValue(value);
    let searchProducts = products?.filter(product =>
      product.title.split(" ").splice(0, 2).join(" ").toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
    );
    setFilteredProducts(searchProducts);
  }

  function getProducts() {



    axios.get("https://ecommerce.routemisr.com/api/v1/products").then(({ data }) => {

      setProducts(data.data)
      setFilteredProducts(data.data);
      setLoader(false)


    }).catch(err => {

      setLoader(false)
    })

  }
  useEffect(() => {
    getProducts()

  }, [])

  useEffect(() => {
    if (products.length && shuffledProducts.length === 0) {
      const productsCopy = [...products];
      for (let i = productsCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [productsCopy[i], productsCopy[j]] = [productsCopy[j], productsCopy[i]];
      }
      setShuffledProducts(productsCopy);
    }
  }, [products, shuffledProducts.length]);

  const productsToShow = count ? shuffledProducts.slice(0, count) : products;

  return (<div className="mt-[100px]">
              <h2 className="text-2xl font-bold text-gray-800 mx-auto my-10 p-2 border-b-2 w-[240px] text-center">Our Products</h2>
    <div className="search flex justify-center  my-16  ">
      <input type="search" placeholder="search..." value={searchValue} onChange={(e) => setSearchVal(e.target.value)} className="w-1/2 search-input border-gray-400  shadow-lg  rounded-xl focus:border-none focus:ring-lime-400 ring-0 "/>
    </div>
    {loader ? <div className=" flex w-full h-lvh items-center justify-center"><GridLoader
      color="#0aad0a" size={50} /></div> : <div className="flex justify-center md:justify-start  h-auto flex-wrap gap-y-10 sm:px-10  p-7">
      {searchValue ? !filteredProducts.length == 0 ?
        filteredProducts.map(product => (<ProductItem product={product} key={product.id} />)) : <div className="flex justify-center  w-full items-center h-min "><p>No items starts with this letter</p></div>
        :
        productsToShow.map(product => (
          <ProductItem product={product} key={product.id} />
        ))
      }

    </div>}
  </div>
  )
}
