import { MessageCircleIcon } from 'lucide-react'

export const ProjectWelcome = () => {
  return (
    <>
      <h1 className="text-4xl font-bold font-satoshi italic tracking-tight mb-4">
        Let&apos;s create your new project
      </h1>
      <p className="text-lg text-muted-foreground font-satoshi italic">
        Share your app idea and I&apos;ll help you develop it into a structured
        project
      </p>
      <div className="mt-6 text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <MessageCircleIcon className="h-4 w-4" />
          <span>10 focused questions to capture your vision</span>
        </div>
      </div>
    </>
  )
}
