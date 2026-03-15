interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "impact" | "success" | "warning";
  size?: "sm" | "md";
}

const v = {
  default: "bg-card-inner text-muted",
  accent: "bg-accent/10 text-accent",
  impact: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
};

const s = { sm: "px-2.5 py-0.5 text-xs", md: "px-3 py-1 text-sm" };

export default function Badge({ children, variant = "default", size = "sm" }: BadgeProps) {
  return <span className={`inline-flex items-center gap-1 rounded-lg font-medium ${v[variant]} ${s[size]}`}>{children}</span>;
}
