import Display from '@comp/display';
import { MarkdownToHtmlWrapper } from '@mod/converters';
import { Helmet } from 'react-helmet';

export interface SingleLessonContentProps {
  slide: string;
  title: string;
  course: string;
}

export function SingleLessonContent({
  course,
  title,
  slide,
}: SingleLessonContentProps) {
  return (
    <div className='container mx-auto px-4'>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {/*<div className='text-5xl font-extrabold text-center'>*/}
      {/*  <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>{title}</span>*/}
      {/*</div>*/}
      <Display data={slide} />
      <MarkdownToHtmlWrapper content={course}>
        {(html) => (
          <article
            className='prose prose-lg mx-auto mt-4 lg:prose-2xl md:mt-8'
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </MarkdownToHtmlWrapper>
    </div>
  );
}
