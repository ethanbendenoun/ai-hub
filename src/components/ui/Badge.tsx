interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "impact" | "success" | "warning";
  size?: "sm" | "md";
}

const variantClasses = {
  default: "bg-card border border-card-border text-muted",
  accent: "bg-accent/10 text-accent border border-accent/20",
  impact: "bg-warning/10 text-warning border border-warning/20",
  success: "bg-success/10 text-success border border-success/20",
  warning: "bg-warning/10 text-warning border border-warning/20",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export default function Badge({
  children,
  variant = "default",
  size = "sm",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </span>
  );
}
