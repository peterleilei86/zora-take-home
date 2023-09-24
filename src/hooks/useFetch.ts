import {searchPhotos} from '@/api'
import {Color} from '@/types'
import {getImageData} from '@/utils'
import {useState} from 'react'
import {Image, SearchParams} from '../types'

export function useFetch() {
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
				console.log(data)
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

	return {
		images,
		searchParams,
		error,
		isLoading,
		totalPages,
		handleSubmit,
		handleSort,
		handleFilter,
		handleLoadMore,
	}
}
