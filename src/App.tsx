import {SearchIcon} from 'lucide-react'
import {useRef, useState} from 'react'
import {searchPhotos} from './api'
import {SearchParams, Image} from './types'
import {getImageData} from './utils'
import {Input} from './components/ui/input'
import {Skeleton} from './components/ui/skeleton'

function App() {
	const [images, setImages] = useState<Image[]>([])
	const [searchParams, setSearchParams] = useState<SearchParams>({
		query: '',
		page: 1,
		orderBy: 'relevant',
		color: undefined,
	})
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const ref = useRef<HTMLInputElement>(null)
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const query = ref.current?.value
		if (!query) return
		setIsLoading(true)

		searchPhotos({...searchParams, query, page: 1})
			.then((data) => {
				if (data.errors) {
					setError(data.errors[0])
				} else {
					const imgs = data.response?.results?.map(getImageData) || []
					if (imgs.length === 0) {
						setError('No images found')
						setImages([])
					} else {
						setImages(imgs)
						setSearchParams((old) => ({...old, query, page: 1}))
						setError('')
					}
				}
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false))
	}

	return (
		<div className='container relative mx-auto'>
			<div className='sticky top-0 z-10 flex flex-col items-center justify-center w-full gap-4 p-6 bg-white md:flex-row'>
				<form
					data-testid='search-form'
					className='w-full'
					onSubmit={handleSubmit}
				>
					<div className='relative'>
						<span className='absolute inset-y-0 left-0 flex items-center pl-2'>
							<SearchIcon className='text-gray-400' />
						</span>
						<Input
							ref={ref}
							placeholder='Search...'
							type='text'
							className='pl-10 rounded-md outline-gray-400'
						/>
					</div>
				</form>
			</div>
			{error && <p className='text-center text-red-500'>{error}</p>}
			{images.length > 0 && (
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
			)}
			{isLoading && (
				<div data-testid='loading' className='flex w-full gap-4'>
					<Skeleton className='w-1/3 h-[300px] rounded-md' />
					<Skeleton className='w-1/3 h-[300px] rounded-md' />
					<Skeleton className='w-1/3 h-[300px] rounded-md' />
				</div>
			)}
		</div>
	)
}

export default App
