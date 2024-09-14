import React from 'react';
import { Parallax } from 'react-parallax';

export default function Jumbotron() {
    return (
        <Parallax
            bgImage="/img/bg-paralax.jpg"
            bgImageStyle={{ objectFit: 'cover', backgroundPosition: 'center bottom' }} // Aligns image bottom to container
            strength={500}
        >
            <div className="relative h-[700px] flex items-center justify-center text-center bg-opacity-30 bg-black">
                <div className="text-white p-8">
                    <h1 className="text-5xl font-bold mb-4">Welcome to Galaxy <br />Online Shop</h1>
                    <p className="text-xl mb-8">Find the best products at unbeatable prices</p>
                    <a
                        href="/"
                        className="inline-block rounded-md border border-transparent bg-indigo-600 lg:mb-0 mb-20 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                    >
                        Shop Now!
                    </a>
                </div>
            </div>
        </Parallax>
    );
}
