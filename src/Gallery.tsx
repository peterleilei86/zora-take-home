import {Image} from './types'

export function Gallery({images}: {images: Image[]}) {
	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
			{images.map((img, i) => {
				return (
					<img
						key={i}
						width={img.width}
						src={img.url}
						alt={img.description}
						loading='lazy'
						data-testid='image'
						className='transition-all duration-300 rounded-md max-h-[300px] w-full object-cover'
					/>
				)
			})}
		</div>
	)
}
