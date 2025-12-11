import { cn } from '@/lib/utils'

interface ButtonProps {
  href?: string
  size?: 'small' | 'medium' | 'large' | 'xl'
  variant?: 'primary' | 'text'
  pulse?: boolean
  children: React.ReactNode
  className?: string
}

export function Button({ href, size = 'medium', variant = 'primary', pulse = false, children, className }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-300 rounded-full'

  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  }

  const variantStyles = {
    primary: 'bg-gradient-cta text-white shadow-lg hover:shadow-xl hover:scale-105',
    text: 'text-primary-pink-dark hover:text-primary-pink underline-offset-4 hover:underline',
  }

  const classes = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    pulse && 'animate-pulse-scale',
    className
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes}>
      {children}
    </button>
  )
}
