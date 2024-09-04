type Props = {
  children: React.ReactNode;
  className?: string;
  justify?: string;
};

const PageContainer = ({ children, className, justify = "center" }: Props) => {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-${justify} gap-10 px-6 py-10 ${className}`}
    >
      {children}
    </div>
  );
};

export default PageContainer;
