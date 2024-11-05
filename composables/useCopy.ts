import { useClipboard } from '@vueuse/core'

export const useCopy = (text: string) => {
    const { copy } = useClipboard()
    copy(text)
}
