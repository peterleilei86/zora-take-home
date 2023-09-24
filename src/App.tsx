import {SearchIcon} from 'lucide-react'
import {useRef, useState} from 'react'
import {searchPhotos} from './api'
import {SearchParams, Image, Color} from './types'
import {getImageData} from './utils'
import {Input} from './components/ui/input'
import {Skeleton} from './components/ui/skeleton'
import {Search} from './Search'
import {Button} from './components/ui/button'
import {Sort} from './Sort'
import {Filter} from './Filter'

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
	const [totalPages, setTotalPages] = useState(0)

	const handleSubmit = (query: string) => {
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
						setTotalPages(0)
					} else {
						setImages(imgs)
						setSearchParams((old) => ({...old, query, page: 1}))
						setTotalPages(data.response.total_pages)
						setError('')
					}
				}
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false))
	}

	const handleLoadMore = () => {
		setIsLoading(true)
		searchPhotos({...searchParams, page: searchParams.page + 1})
			.then(({response}) => {
				const imgs = response?.results?.map(getImageData) || []
				setImages((old) => [...old, ...imgs])
				setSearchParams((old) => ({...old, page: old.page + 1}))
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false))
	}

	const handleSort = (orderBy: 'latest' | 'relevant') => {
		searchPhotos({...searchParams, orderBy, page: 1})
			.then(({response}) => {
				const imgs = response?.results?.map(getImageData) || []
				setImages(imgs)
				setSearchParams((old) => ({...old, orderBy, page: 1}))
			})
			.catch((e) => console.log(e))
	}

	const handleFilter = (color: Color) => {
		searchPhotos({...searchParams, color, page: 1})
			.then(({response}) => {
				const imgs = response?.results?.map(getImageData) || []
				setImages(imgs)
				setSearchParams((old) => ({...old, color, page: 1}))
			})
			.catch((e) => console.log(e))
	}

	return (
		<div className='container relative mx-auto'>
			<div className='sticky top-0 z-10 flex flex-col items-center justify-center w-full gap-4 p-6 bg-white md:flex-row'>
				<Search onSubmit={handleSubmit} />
				<div className='flex items-center w-full gap-2 md:w-1/2'>
					<Sort onSort={handleSort} />
					<Filter onFilter={handleFilter} />
				</div>
			</div>
			{error && !isLoading && (
				<p className='text-center text-red-500'>{error}</p>
			)}
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
			{images.length > 0 && searchParams.page < totalPages && (
				<div className='m-4'>
					<Button variant='outline' className='w-full' onClick={handleLoadMore}>
						Load More
					</Button>
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
