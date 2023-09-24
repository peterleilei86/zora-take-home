import {Skeleton} from './components/ui/skeleton'
import {Search} from './Search'
import {Button} from './components/ui/button'
import {Sort} from './Sort'
import {Filter} from './Filter'
import {Gallery} from './Gallery'
import {useFetch} from './hooks/useFetch'

function App() {
	const {
		images,
		error,
		isLoading,
		totalPages,
		handleSubmit,
		handleSort,
		handleFilter,
		handleLoadMore,
		searchParams,
	} = useFetch()

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
			{images.length > 0 && <Gallery images={images} />}
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
