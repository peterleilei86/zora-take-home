import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem,
} from './components/ui/select'

export function Sort({
	onSort,
}: {
	onSort: (orderBy: 'latest' | 'relevant') => void
}) {
	return (
		<Select onValueChange={onSort}>
			<SelectTrigger className='w-1/2'>
				<SelectValue placeholder='Sort by' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Sort by</SelectLabel>
					<SelectItem value='relevant'>Relavent</SelectItem>
					<SelectItem value='latest'>Latest</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
