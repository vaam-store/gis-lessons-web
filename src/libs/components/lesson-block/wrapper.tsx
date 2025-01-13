import { useGetLessonBlocks } from '@openapi/queries';
import { LessonBlock } from '@openapi/requests';
import { JSX } from 'react';

export interface LessonBlockWrapperProps {
  slug_name_or_id: string;
  children: (params: { blocks: LessonBlock[] }) => JSX.Element;
}

export default function LessonBlockWrapper({
  children,
  slug_name_or_id,
}: LessonBlockWrapperProps) {
  const { data, isPending, isError, error } = useGetLessonBlocks({
    path: {
      slug_name_or_id,
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError || !data || error) {
    return <div>Error</div>;
  }

  return children({ blocks: data });
}