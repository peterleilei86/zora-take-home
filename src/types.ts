export type Image = {
	id: string
	width: number
	height: number
	description: string
	url: string
}

export type SearchParams = {
	query: string
	page: number
	orderBy?: 'latest' | 'relevant'
	color?: Color
}

export type Color =
	| 'black_and_white'
	| 'black'
	| 'white'
	| 'yellow'
	| 'orange'
	| 'red'
	| 'purple'
	| 'magenta'
	| 'green'
	| 'teal'
	| 'blue'
