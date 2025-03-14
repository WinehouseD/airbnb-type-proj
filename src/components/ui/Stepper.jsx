import * as React from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

const Stepper = React.forwardRef(
  ({ className, label, onChange, value, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 min-w-[190px] items-center justify-between gap-2 rounded-md border border-input bg-background py-2 text-sm',
          className,
        )}
      >
        <Button
          type='button'
          aria-label={`Decrease ${label}`}
          disabled={value === 0}
          variant='link'
          onClick={() => onChange(value - 1)}
          data-testid='stepper-decrement'
        >
          -
        </Button>
        <span
          className={cn(!value && 'truncate text-muted-foreground')}
          ref={ref}
          {...props}
        >
          {value} {label}
          {value > 1 || value === 0 ? 's' : ''}
        </span>
        <Button
          type='button'
          aria-label={`Increase ${label}`}
          disabled={value === 100}
          variant='link'
          onClick={() => onChange(value + 1)}
          data-testid='stepper-increment'
        >
          +
        </Button>
      </div>
    );
  },
);
Stepper.displayName = 'Stepper';

export { Stepper };
