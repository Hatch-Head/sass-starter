import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../utils";

const cardVariants = cva(
  "bg-card text-card-foreground rounded-lg border shadow w-full",
  {
    variants: {
      active: {
        true: "border-primary-600",
        false: "border-gray-200",
      },
    },
  },
);

interface CardProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

interface CardComponent extends React.ForwardRefExoticComponent<CardProps> {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, active, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ active }), className)}
      {...props}
    />
  ),
) as CardComponent;
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-none", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-3 flex items-center justify-end space-x-3 border-t border-gray-100 p-3",
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Sub components
Card.Header = CardHeader;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Content = CardContent;

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
