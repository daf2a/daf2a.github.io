import { cn } from "@/utils/cn";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  imageUrl,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  imageUrl: string;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-3 bg-white dark:bg-zinc-950 dark:border-white/[0.2] border-gray/[0.1] border justify-between flex flex-col space-y-4",
        className
      )}
    >
      <DirectionAwareHover imageUrl={imageUrl}>
        <p className="font-bold text-xl">{title}</p>
        <p className="font-normal text-sm">{description}</p>
      </DirectionAwareHover>
    </div>
  );
};
