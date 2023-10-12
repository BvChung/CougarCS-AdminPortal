type labelWrapperProps = {
  children: React.ReactNode;
  label: string;
  className?: string;
  required?: boolean;
};

export const LabelWrapper = ({
  children,
  label,
  className,
  required,
}: labelWrapperProps) => {
  return (
    <div className={className}>
      <label>
        <span
          className={
            required
              ? "text-sm after:ml-1 after:align-sub after:text-red-500 after:content-['*']"
              : ""
          }
        >
          {label}
        </span>
        {children}
      </label>
    </div>
  );
};
