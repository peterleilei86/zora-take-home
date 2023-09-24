import {useRef} from 'react'

import {SearchIcon} from 'lucide-react'
import {Input} from '@/components/ui/input'

export function Search({onSubmit}: {onSubmit: (orderBy: string) => void}) {
	const ref = useRef<HTMLInputElement>(null)
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!ref.current?.value) return

		onSubmit(ref.current?.value)
	}

	return (
		<form data-testid='search-form' className='w-full' onSubmit={handleSubmit}>
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
	)
}
