import { markdownToHtml } from '@mod/converters/markdown-to-html.ts';
import { useQuery } from '@tanstack/react-query';
import matter from 'front-matter';

export function useMarkdownToHtml(content: string) {
  return useQuery({
    queryKey: ['markdownToHtml', content],
    queryFn: () => markdownToHtml(content),
  });
}

export function useGetMatter<T = Record<string, string>>(content: string) {
  return useQuery({
    queryKey: ['getMatter', content],
    queryFn: () => matter<T>(content),
  });
}
