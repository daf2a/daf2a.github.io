import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export default function Gallery() {
  const items = [
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the mountains",
      description: "$1299 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "By the beach",
      description: "$1599 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the forest",
      description: "$1199 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the city",
      description: "$1899 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the mountains",
      description: "$1299 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "By the beach",
      description: "$1599 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the forest",
      description: "$1199 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the city",
      description: "$1899 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the mountains",
      description: "$1299 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "By the beach",
      description: "$1599 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the forest",
      description: "$1199 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the city",
      description: "$1899 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the mountains",
      description: "$1299 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "By the beach",
      description: "$1599 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the forest",
      description: "$1199 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the city",
      description: "$1899 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the mountains",
      description: "$1299 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "By the beach",
      description: "$1599 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the forest",
      description: "$1199 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the city",
      description: "$1899 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the mountains",
      description: "$1299 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "By the beach",
      description: "$1599 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the forest",
      description: "$1199 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the city",
      description: "$1899 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the mountains",
      description: "$1299 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "By the beach",
      description: "$1599 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the forest",
      description: "$1199 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the city",
      description: "$1899 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the mountains",
      description: "$1299 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "By the beach",
      description: "$1599 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the forest",
      description: "$1199 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the city",
      description: "$1899 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the mountains",
      description: "$1299 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "By the beach",
      description: "$1599 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the forest",
      description: "$1199 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the city",
      description: "$1899 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the mountains",
      description: "$1299 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "By the beach",
      description: "$1599 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the forest",
      description: "$1199 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the city",
      description: "$1899 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the mountains",
      description: "$1299 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "By the beach",
      description: "$1599 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the forest",
      description: "$1199 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the city",
      description: "$1899 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the mountains",
      description: "$1299 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "By the beach",
      description: "$1599 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the forest",
      description: "$1199 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the city",
      description: "$1899 / night",
    },
    {
      imageUrl:
        "https://source.unsplash.com/random/?forest",
      title: "In the city",
      description: "$1899 / night",
    },
    // Add more items as needed
  ];

  return (
    <>
      {" "}
      <div className="fixed top-0 -z-50 h-screen w-full">
        <div className="h-screen w-full dark:bg-transparent bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.05] items-center justify-center"></div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-zinc-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      </div>
      <BentoGrid className="max-w-full mx-auto text-left py-4 px-8 md:py-14 md:px-32">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            className={
              (i + 2) % 7 === 3 || (i + 2) % 7 === 4 ? "md:col-span-2" : ""
            }
          />
        ))}
      </BentoGrid>
    </>
  );
}
