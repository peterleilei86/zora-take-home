import {SearchParams} from '@/types'
import {createApi} from 'unsplash-js'

export const api = createApi({
	accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
})
export const searchPhotos = async ({
	query,
	orderBy = 'relevant',
	page,
	color,
}: SearchParams) => {
	return await api.search.getPhotos({
		query,
		orderBy,
		perPage: 50,
		page,
		color,
	})
}
