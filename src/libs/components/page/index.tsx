import {
  type EditorConfig,
  type ToolConstructable,
  type ToolSettings,
} from '@editorjs/editorjs';
import { createReactEditorJS } from 'react-editor-js';

import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import SimpleImage from '@editorjs/simple-image';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';

const EDITOR_JS_TOOLS: Record<string, ToolConstructable | ToolSettings> = {
  table: Table,
  list: List,
  warning: Warning,
  image: Image,
  header: Header,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};

const ReactEditorJS = createReactEditorJS();

export interface EditorPageProps {
  blocks: EditorConfig['data'];
}

export function EditorPage({ blocks }: EditorPageProps) {
  return (
    <ReactEditorJS defaultValue={blocks} tools={EDITOR_JS_TOOLS}>
      <div id='custom-miaou'>Miaou</div>
    </ReactEditorJS>
  );
}
