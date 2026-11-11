import type { ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'portfolio-button',
  {
    variants: {
      variant: {
        default: 'portfolio-button--primary',
        outline: 'portfolio-button--outline',
        subtle: 'portfolio-button--subtle',
      },
      size: {
        default: '',
        small: 'portfolio-button--small',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
