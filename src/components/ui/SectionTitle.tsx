import { cn } from '@/lib/utils'

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2 className={cn(
      'font-display text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight text-center mb-10 text-balance',
      className
    )}>
      {children}
    </h2>
  )
}
