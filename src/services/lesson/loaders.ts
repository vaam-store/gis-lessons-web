import { prefetchUseGetLessonCourse } from '@openapi/queries/prefetch.ts';
import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

export function lessonLoader(
  qc: QueryClient,
): (args: LoaderFunctionArgs<any>, handlerCtx?: any) => Promise<any> {
  return async (args) => {
    if (!args.params.slug_name) {
      return null;
    }

    await prefetchUseGetLessonCourse(qc, {
      path: {
        slug_name_or_id: args.params.slug_name,
      },
    });
  };
}
