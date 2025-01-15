import { useEffect, useRef } from 'react';
import Reveal from 'reveal.js';
import RevealMermaid from 'reveal.js-mermaid-plugin';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
import Notes from 'reveal.js/plugin/notes/notes';
import RevealSearch from 'reveal.js/plugin/search/search';

import { LessonBlock } from '@openapi/requests';
import './presentation.scss';

const htmlContent = (data: string) => `
<section data-markdown data-separator="\n---\n" data-separator-vertical="\n------\n">
  <textarea data-template>
    ${data}
  </textarea>
</section>
`;

export interface DisplayProps {
  block: LessonBlock;
}

export default function LessonPresentation({ block: { data } }: DisplayProps) {
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance

  useEffect(() => {
    // Prevents double initialization in strict mode
    if (deckRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current!, {
      plugins: [
        RevealMarkdown,
        RevealHighlight,
        Notes,
        RevealSearch,
        RevealMermaid,
      ],
      controls: true,
      embedded: true,
    });

    deckRef.current
      .initialize()
      .then(() => {
        console.log('Deck initialized');
        // good place for event handlers and plugin setups
      })
      .catch(console.warn);

    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        console.warn('Reveal.js destroy call failed.', e);
      }
    };
  }, []);

  return (
    <div className='display'>
      <div className='reveal' ref={deckDivRef}>
        <div
          className='slides'
          dangerouslySetInnerHTML={{
            __html: htmlContent(data.content as string),
          }}
        />
      </div>
    </div>
  );
}
