import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem,
} from './components/ui/select'
import {Color} from './types'

const colorOptions = [
	'black',
	'white',
	'yellow',
	'orange',
	'red',
	'purple',
	'magenta',
	'green',
	'teal',
	'blue',
]

export function Filter({onFilter}: {onFilter: (color: Color) => void}) {
	return (
		<Select onValueChange={onFilter}>
			<SelectTrigger className='w-1/2'>
				<SelectValue placeholder='Filter by color' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Sort by</SelectLabel>
					<SelectItem value='black_and_white'>Black & White</SelectItem>
					{colorOptions.map((color) => (
						<SelectItem className='capitalize' key={color} value={color}>
							{color}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
