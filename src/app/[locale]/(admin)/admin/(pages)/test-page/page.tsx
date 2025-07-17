'use client'

import { useSearchDebounce } from '@/hooks/useSearchDebounce'

export default function Page() {
	const { search, data, isLoading, isError, isSuccess } = useSearchDebounce()

	console.log('Search Data:', data)

	return (
		<div>
			<input
				type='text'
				onChange={e => search(e.target.value)}
                className='border p-2 rounded-md mb-4 w-full max-w-md'
			/>
			{isLoading && <p>Loading...</p>}
			{isError && <p>Error occurred</p>}
			{isSuccess && data && (
				<ul>
					{data.data.results.map(item => (
						<>
							<li key={item._id}>{item.title.ro}</li>
							<li>{item.response_type}</li>
						</>
					))}
				</ul>
			)}
		</div>
	)
}
