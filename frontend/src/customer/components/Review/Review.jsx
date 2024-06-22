import React from 'react';
import { reviewData } from "./ReviewData";
import { StarIcon } from '@heroicons/react/20/solid'

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Review = () => {
    return (
    <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-30">
                <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
        
                <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                    {reviewData.map((callout) => (
                    <div key={callout.id} className="max-w-sm rounded-lg overflow-hidden bg-white">
                        <div className='relative h-48 w-full overflow-hidden bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-48'>
                            <img src={callout.imageSrc} alt={callout.imageAlt} className="h-full w-full object-cover object-center"/>
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{callout.name}</div>
                            <p className="text-gray-700 text-sm">
                            {callout.comment}
                            </p>
                        </div>
                        <div className="relative flex items-center gap-x-4 px-6 pb-4">
                            <img src={callout.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                            <div className="text-sm leading-6">
                            <p className="font-semibold text-gray-900">
                                <a href={callout.author.href}>
                                <span className="absolute inset-0" />
                                {callout.author.name}
                                </a>
                            </p>
                            <p className="text-gray-600">{callout.author.role}</p>
                            </div>
                            <div className="relative flex flex-col items-center gap-x-8 px-6">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                        key={rating}
                                        className={classNames(
                                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                        'h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                    ))}
                                </div>
                                <span className="sr-only">{reviews.average} out of 5 stars</span>
                                <a href={reviews.href} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {reviews.totalCount} reviews
                                </a>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
};

export default Review;
