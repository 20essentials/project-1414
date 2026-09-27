export function WrapperComponent({ children }: { children: React.ReactNode }) {
  return (
    <article className='w-auto h-auto bg-slate-800 border border-dashed border-white/50 rounded-3xl'>
      {children}
    </article>
  );
}
