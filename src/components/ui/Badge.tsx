interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "impact" | "success" | "warning";
  size?: "sm" | "md";
}

const variantClasses = {
  default: "bg-foreground/5 text-muted",
  accent: "bg-accent/8 text-accent",
  impact: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
};

const sizeClasses = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export default function Badge({ children, variant = "default", size = "sm" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
}
