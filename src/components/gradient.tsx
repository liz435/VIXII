import { clsx } from 'clsx'

export function Gradient({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
<div
  {...props}
  className={clsx(
    className,
    'bg-[linear-gradient(180deg,#c8eaec,#cff6d2,#f2f5f9)] sm:bg-[linear-gradient(180deg,#c8eaec,#cff6d2,#f2f5f9)]',
  )}
/>

  )
}

export function GradientBackground() {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={clsx(
          'absolute -right-60 -top-44 h-60 w-[36rem] transform-gpu md:right-0',
          'bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#c3ffbe] from-[28%] via-[#8feed7] via-[70%] to-[#3bf9b0]',
          'rotate-[-10deg] rounded-full blur-3xl',
        )}
      />
    </div>
  )
}
