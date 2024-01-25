import React from 'react'
import { RouteObjects } from '../../Routes/RouteObjests'

const Banner = () => {
	return (
		<section style={{ backgroundImage: 'url("/images/banner.jpg")', backgroundSize: 'cover', }} className="dark:bg-gray-800 dark:text-gray-100 pt-20">
			<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
				<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
					<h1 className="text-5xl font-bold leadi sm:text-6xl">Wear
						<span className="dark:text-violet-400">Time</span>
						with Purpose , Embrace Moments with Grace
					</h1>

					<div className=" mt-3 flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
						<a rel="noopener noreferrer" href={RouteObjects.Products} className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Shop Here</a>
					</div>
				</div>
				<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
					<img src="assets/svg/Business_SVG.svg" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
				</div>
			</div>
		</section>
	)
}

export default Banner