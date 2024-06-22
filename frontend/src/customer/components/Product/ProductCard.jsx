import React from 'react'
import { productData } from './ProductCardData'

const ProductCard = () => {
    return (
    <div className="bg-transparent">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {productData.map((product) => (
                <a key={product.id} href="" className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-60 w-full object-cover object-center"
                    />
                    </div>
                    <div className="px-6 py-4 flex justify-between">
                        <div>
                            <h3 className="mb-1 text-md text-gray-700">{product.name}</h3>
                            <p className="mb-1 text-sm text-gray-500">{product.color}</p>
                        </div>
                        <p className="text-gray-700 text-base">
                            {product.price}
                        </p>
                    </div>
                </a>
                ))}
            </div>
        </div>
    </div>
    )
}

export default ProductCard