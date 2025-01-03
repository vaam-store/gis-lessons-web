import { FrontMatterResult } from 'front-matter';
import { JSX } from 'react';
import { Loading } from 'react-daisyui';
import { useGetMatter, useMarkdownToHtml } from './hooks';

export interface MarkdownToHtmlProps {
  content: string;
  children: (html: string) => JSX.Element;
}

export function MarkdownToHtmlWrapper({
  content,
  children,
}: MarkdownToHtmlProps) {
  const { data, error, isPending } = useMarkdownToHtml(content);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return children(data as any);
}

export interface MarkdownMatterWrapperProps {
  content: string;
  children: (data: FrontMatterResult<Record<string, string>>) => JSX.Element;
}

export function MarkdownMatterWrapper({
  content,
  children,
}: MarkdownMatterWrapperProps) {
  const { data, error, isPending } = useGetMatter(content);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return children(data);
}
