import {rest} from 'msw'

// mock data
const images = [
	{
		id: '1',
		total_pages: 6,
		page: 1,
		urls: {
			raw: 'https://source.unsplash.com/random/400x400',
			full: 'https://source.unsplash.com/random/400x400',
			regular: 'https://source.unsplash.com/random/400x400',
			small: 'https://source.unsplash.com/random/400x400',
			thumb: 'https://source.unsplash.com/random/400x400',
		},
		alt_description: 'initial images',
	},
	{
		id: '2',
		total_pages: 6,
		page: 1,
		urls: {
			raw: 'https://source.unsplash.com/random/400x400',
			full: 'https://source.unsplash.com/random/400x400',
			regular: 'https://source.unsplash.com/random/400x400',
			small: 'https://source.unsplash.com/random/400x400',
			thumb: 'https://source.unsplash.com/random/400',
		},
		alt_description: 'initial images',
	},
]

export const searchHandler = rest.get(
	'https://api.unsplash.com/search/photos',
	(req, res, ctx) => {
		const query = req.url.searchParams.get('query')

		if (query === 'error') {
			return res(ctx.status(401), ctx.json({errors: ['Something went wrong']}))
		}

		return res(
			ctx.json({
				total: 1132,
				total_pages: 6,
				results: images,
			})
		)
	}
)

export const handlers = [searchHandler]
