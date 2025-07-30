import { useLenis } from 'lenis/react'
import { useCallback } from 'react'

let locks = 0

export function useScrollLock() {
	const lenis = useLenis()

	const lock = useCallback(() => {
		if (locks === 0) lenis?.stop()
		locks += 1
	}, [lenis])

	const unlock = useCallback(() => {
		locks = Math.max(0, locks - 1)
		if (locks === 0) lenis?.start()
	}, [lenis])

	return { lock, unlock }
}
