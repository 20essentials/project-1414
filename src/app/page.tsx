import { WrapperComponent } from "@/components/wrapper-component";
import { components } from "@/lib/data-components";

export default function Home() {
  return (
    <section className="bg-black-700 flex h-auto min-h-screen w-full flex-wrap gap-4 p-8">
      {components.map(({ title, Component, url }) => (
        <WrapperComponent title={title} key={title} url={url}>
          <Component />
        </WrapperComponent>
      ))}
    </section>
  );
}
