import { JSX } from 'react';
import { Loading } from 'react-daisyui';
import { useMarkdownToHtml } from './hooks';

export interface MarkdownToHtmlProps {
  content: string;
  children: (html: string) => JSX.Element;
}

export function MarkdownToHtmlWrapper({
  content,
  children,
}: MarkdownToHtmlProps) {
  const { data, isError, isPending } = useMarkdownToHtml(content);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return children(data.toString());
}
