import { prefetchUseGetLesson } from '@openapi/queries/prefetch.ts';
import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

export function lessonLoader(
  qc: QueryClient,
): (args: LoaderFunctionArgs<any>, handlerCtx?: any) => Promise<any> {
  return async (args) => {
    if (!args.params.lessonId) {
      return null;
    }

    await prefetchUseGetLesson(qc, {
      path: {
        lessonId: args.params.lessonId,
      },
    });
  };
}
