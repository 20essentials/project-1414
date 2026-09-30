import { ExternalLink } from "./icons/external-link";

export function WrapperComponent({
  children,
  title,
  url,
}: {
  children: React.ReactNode;
  title: string;
  url: string;
}) {
  return (
    <article className="h-max w-125 rounded-lg border border-dashed border-white/50 bg-transparent min-w-md">
      <header className="flex justify-between border-b border-dashed border-white/50 p-4 py-3">
        <h4 className="font-bold italic">{title}</h4>
        <a href={url} target="_blank">
          <ExternalLink className="size-5" />
        </a>
      </header>
      <section className="p-4">{children}</section>
    </article>
  );
}
