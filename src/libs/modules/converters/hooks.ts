import { markdownToHtml } from '@mod/converters/markdown-to-html.ts';
import { useQuery } from '@tanstack/react-query';

export function useMarkdownToHtml(content: string) {
  return useQuery({
    queryKey: ['markdownToHtml', content],
    queryFn: () => markdownToHtml(content),
  });
}
