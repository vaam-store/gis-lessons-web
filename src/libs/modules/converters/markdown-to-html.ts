import rehypeHighlight from 'rehype-highlight';
import rehypeMermaid from 'rehype-mermaid';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeTargetBlank from 'rehype-target-blank';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { twMerge } from 'tailwind-merge';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

type NodeType = Record<string, any> & {
  children: NodeType[];
  properties: Record<string, any>;
};

const rehypeHeadingToSpan = () => {
  return (tree: any) => {
    visit(tree, 'element', (node: Record<string, any>) => {
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

const rehypePreCodeHighlight = () => {
  return (tree: any) => {
    visit(tree, 'element', (node: NodeType) => {
      if (node.tagName === 'pre') {
        for (const child of node.children) {
          if (child.tagName === 'code') {
            node.properties.className = twMerge(
              '!p-0 -mx-4 md:-mx-8 lg:-mx-12 !rounded-none',
              node.properties.className as string,
            );
            child.properties.className = twMerge(
              '!p-4 md:!px-8 lg:!px-12',
              child.properties.className as string,
            );
          }
        }
      }
    });
  };
};

export const markdownToHtml = async (content: string) =>
  await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeHeadingToSpan)
    .use(rehypeTargetBlank)
    .use(rehypeMermaid)
    .use(rehypeHighlight)
    .use(rehypePreCodeHighlight)
    .use(rehypeStringify)
    .process(content);
