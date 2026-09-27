import { components } from '@/lib/data-components';

export default function Home() {
  return (
    <section className='w-full h-auto min-h-screen bg-slate-700'>
      {components.map(({ title, Component }) => (
        <Component key={title} />
      ))}
    </section>
  );
}
