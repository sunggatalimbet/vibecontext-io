import { LoaderPinwheelIcon } from 'lucide-react'

interface AsyncButtonContentProps {
  isLoading: boolean
  loadingText: string
  children: React.ReactNode
}

export const AsyncButtonContent = ({
  isLoading,
  loadingText,
  children,
}: AsyncButtonContentProps) => {
  if (isLoading) {
    return (
      <>
        <LoaderPinwheelIcon className="h-4 w-4 animate-spin" />
        <span className="ml-2">{loadingText}</span>
      </>
    )
  }

  return children
}
