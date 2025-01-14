import { useGetLessonBlocks } from '@openapi/queries';
import { LessonBlock } from '@openapi/requests';
import * as _ from 'lodash';
import { JSX, useMemo } from 'react';

export interface LessonBlockWrapperProps {
  lessonId: string;
  children: (params: { blocks: LessonBlock[] }) => JSX.Element;
}

export default function LessonBlockWrapper({
  children,
  lessonId,
}: LessonBlockWrapperProps) {
  const { data, isPending, isError, error } = useGetLessonBlocks({
    path: {
      lessonId,
    },
  });

  const blocks = useMemo(
    () => _.sortBy(Object.entries(data || {}), '0').map(([, b]) => b),
    [data],
  );

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError || !blocks || error) {
    return <div>Error</div>;
  }

  return children({ blocks });
}