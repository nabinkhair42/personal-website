import ShellWrapper from "@/components/layouts/shell-wrapper";

export const NoMoreBlogs = () => {
  return (
    <ShellWrapper>
      <div className="flex min-h-28 flex-col items-center justify-center space-y-2 p-2 text-center">
        <h2 className="text-2xl font-medium">You&apos;ve hit the bottom.</h2>
        <p className="text-base text-muted-foreground">
          More posts in the queue — I&apos;ll try to write faster.
        </p>
      </div>
    </ShellWrapper>
  );
};
