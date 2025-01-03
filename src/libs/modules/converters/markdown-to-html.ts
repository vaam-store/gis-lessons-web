import rehypeSanitize from 'rehype-sanitize';
import rehypeStarryNight from 'rehype-starry-night';
import rehypeStringify from 'rehype-stringify';
import rehypeTargetBlank from 'rehype-target-blank';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

const rehypeHeadingToSpan = () => {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'h1') {
        node.children = [
          {
            type: 'element',
            tagName: 'span',
            properties: {},
            children: node.children,
          },
        ];
      }
    });
  };
};

export const markdownToHtml = async (content: string) =>
  await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStarryNight)
    .use(rehypeHeadingToSpan)
    .use(rehypeTargetBlank)
    .use(rehypeStringify)
    .process(content);