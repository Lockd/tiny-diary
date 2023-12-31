import List from "@editorjs/list";
import Header from "@editorjs/header";
import Checklist from "@editorjs/checklist";
import Paragraph from "@editorjs/paragraph";

export const EDITOR_TOOLS = {
  list: List,
  header: Header,
  checklist: Checklist,
  paragraph: Paragraph,
};

export const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [],
};

export const EDITOR_BLOCK_ID = "editor-block";
