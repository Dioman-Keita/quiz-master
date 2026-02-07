// src/shared/ui/typography.tsx
import * as React from "react";
import { cn } from "../lib/cn";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "blockquote"
    | "ul"
    | "ol"
    | "li"
    | "lead"
    | "large"
    | "small"
    | "muted";
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, ...props }, ref) => {
    const variantMapping: Record<NonNullable<TypographyProps['variant']>, React.ElementType> = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      p: 'p',
      blockquote: 'blockquote',
      ul: 'ul',
      ol: 'ol',
      li: 'li',
      lead: 'p', // Render as p, style with lead classes
      large: 'span', // Render as span, style with large classes
      small: 'small', // Use native small tag for small variant
      muted: 'span', // Render as span, style with muted classes
    };

    const Comp = variant ? variantMapping[variant] : 'p'; // Default to 'p'

    const getVariantClass = () => {
      switch (variant) {
        case "h1":
          return "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl";
        case "h2":
          return "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0";
        case "h3":
          return "scroll-m-20 text-2xl font-semibold tracking-tight";
        case "h4":
          return "scroll-m-20 text-xl font-semibold tracking-tight";
        case "blockquote":
          return "mt-6 border-l-2 pl-6 italic";
        case "ul":
          return "my-6 ml-6 list-disc [&>li]:mt-2";
        case "ol":
          return "my-6 ml-6 list-decimal [&>li]:mt-2";
        case "li":
          return "mt-2";
        case "lead":
          return "text-xl text-muted-foreground";
        case "large":
          return "text-lg font-semibold";
        case "small":
          return "text-sm font-medium leading-none";
        case "muted":
          return "text-sm text-muted-foreground";
        case "p":
        default:
          return "leading-7 [&:not(:first-child)]:mt-6";
      }
    };

    return (
      <Comp
        ref={ref as React.Ref<HTMLElement>} // Cast ref to HTMLElement for dynamic components
        className={cn(getVariantClass(), className)}
        {...props}
      />
    );
  }
);
Typography.displayName = "Typography";
