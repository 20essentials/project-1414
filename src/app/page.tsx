import { WrapperComponent } from '@/components/wrapper-component';
import { components } from '@/lib/data-components';

export default function Home() {
  return (
    <section className='w-full h-auto min-h-screen bg-black-700 p-8 flex gap-4'>
      {components.map(({ title, Component, url }) => (
        <WrapperComponent title={title} key={title} url={url}>
          <Component />
        </WrapperComponent>
      ))}
    </section>
  );
}
