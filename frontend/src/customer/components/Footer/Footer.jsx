import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Example() {
    return (
        <>
            <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Subscribe to our newsletter.</h2>
                        <p className="mt-4 text-lg leading-8 text-gray-300">
                        Subscribe now to stay updated with our latest news 
                        <br></br>and offers!
                        </p>
                        <div className="mt-6 flex max-w-md gap-x-4">
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            placeholder="Enter your email"
                        />
                        <button
                            type="submit"
                            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Subscribe
                        </button>
                        </div>
                    </div>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                        <div className="flex flex-col items-start">
                        <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                            <CalendarDaysIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <dt className="mt-4 font-semibold text-white">Weekly promotions</dt>
                        <dd className="mt-2 leading-7 text-gray-400">
                            Get weekly new promo updates will send to your email account.
                        </dd>
                        </div>
                        <div className="flex flex-col items-start">
                        <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                            <HandRaisedIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <dt className="mt-4 font-semibold text-white">No spam</dt>
                        <dd className="mt-2 leading-7 text-gray-400">
                            And we promise don't send to your email a trash mails.
                        </dd>
                        </div>
                    </dl>
                    </div>
                </div>
                <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                    <div
                    className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                    style={{
                        clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    />
                </div>
            </div>
            <footer>
                <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-indigo-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
                    <div
                    className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                    aria-hidden="true"
                    >
                    <div
                        className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                        style={{
                        clipPath:
                            'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                        }}
                    />
                    </div>
                    <div
                    className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                    aria-hidden="true"
                    >
                    <div
                        className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                        style={{
                        clipPath:
                            'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                        }}
                    />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <p className="text-sm leading-6 text-white">
                        © 2023 Universe. All rights reserved.
                        </p>
                    </div>
                    <div className="flex gap-2 flex-1 justify-start text-white">
                        <a href="#">
                            <InstagramIcon/>
                        </a>
                        <a href="#">
                            <FacebookIcon/>
                        </a>
                        <a href="#">
                            <TwitterIcon/>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}
