import {searchPhotos} from '@/api'
import {Color} from '@/types'
import {getImageData} from '@/utils'
import {useEffect, useState} from 'react'
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

	const IMAGE_HEIGHT = 300

	const handleLoadMore = () => {
		if (searchParams.page < totalPages) {
			loadData({page: searchParams.page + 1})
		}
	}

	useEffect(() => {
		const handleInfiniteScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop + IMAGE_HEIGHT <
					document.documentElement.offsetHeight ||
				isLoading
			) {
				return
			}

			handleLoadMore()
		}
		window.addEventListener('scroll', handleInfiniteScroll)

		return () => {
			window.removeEventListener('scroll', handleInfiniteScroll)
		}
	}, [isLoading])

	const handleScrollToTop = () => {
		window.scrollTo({top: 0, behavior: 'smooth'})
	}

	const loadData = (option: Partial<SearchParams>) => {
		setIsLoading(true)

		const newParams = {...searchParams, ...option}

		searchPhotos(newParams)
			.then((data) => {
				if (data.errors) {
					setError(data.errors[0])
				} else {
					const imgs = data.response?.results?.map(getImageData) || []
					if (imgs.length === 0) {
						setError('No images found')
						setImages([])
						setSearchParams(newParams)
						setTotalPages(0)
					} else {
						setImages((old) =>
							newParams.page === 1 ? imgs : [...old, ...imgs]
						)
						setSearchParams(newParams)
						setTotalPages(data.response.total_pages)
						setError('')
					}
				}
			})
			.catch((e) => console.log(e))
			.finally(() => {
				if (newParams.page === 1) {
					handleScrollToTop()
				}
				setIsLoading(false)
			})
	}

	const handleSubmit = (query: string) => {
		if (!query) return

		loadData({query, page: 1})
	}

	const handleSort = (orderBy: 'latest' | 'relevant') => {
		loadData({orderBy, page: 1})
	}

	const handleFilter = (color: Color) => {
		loadData({color, page: 1})
	}

	return {
		images,
		error,
		isLoading,
		handleSubmit,
		handleSort,
		handleFilter,
	}
}
