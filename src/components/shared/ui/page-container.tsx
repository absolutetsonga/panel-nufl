type Props = {
  children: React.ReactNode;
  className?: string;
};

const PageContainer = ({ children }: Props) => {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center gap-10 py-10 px-6`}
    >
      {children}
    </div>
  );
};

export default PageContainer;