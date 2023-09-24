import {
	fireEvent,
	render,
	screen,
	waitForElementToBeRemoved,
} from './utils/test-utils'
import App from './App'

describe('<App />', () => {
	it('renders search input form', () => {
		render(<App />)
		expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
	})

	it('renders correct search results', async () => {
		render(<App />)
		const input = screen.getByPlaceholderText('Search...')
		fireEvent.change(input, {target: {value: 'cat'}})

		fireEvent.submit(screen.getByTestId('search-form'))

		await waitForElementToBeRemoved(() => screen.queryByTestId('loading'))

		expect(screen.getAllByTestId('image')).toHaveLength(2)
	})

	it('renders error when search fails', async () => {
		render(<App />)
		const input = screen.getByPlaceholderText('Search...')

		fireEvent.change(input, {target: {value: 'error'}})

		fireEvent.submit(screen.getByTestId('search-form'))

		await waitForElementToBeRemoved(() => screen.queryByTestId('loading'))

		expect(screen.getByText('Something went wrong')).toBeInTheDocument()
	})
})
