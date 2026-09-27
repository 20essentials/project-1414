import { ExternalLink } from './icons/external-link';

export function WrapperComponent({
  children,
  title,
  url
}: {
  children: React.ReactNode;
  title: string;
  url: string;
}) {
  return (
    <article className=' h-auto bg-transparent border border-dashed border-white/50 rounded-2xl w-125'>
      <header className='p-4 border-b border-dashed border-white/50 flex justify-between'>
        <h4 className='italic font-bold'>{title}</h4>
        <a href={url} target='_blank'>
          <ExternalLink className='size-5' />
        </a>
      </header>
      <section className='p-4 '>{children}</section>
    </article>
  );
}
