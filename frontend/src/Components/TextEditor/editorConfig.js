import List from "@editorjs/list";
import Header from "@editorjs/header";
import Checklist from "@editorjs/checklist";

export const EDITOR_TOOLS = {
  list: List,
  header: Header,
  checklist: Checklist,
};

export const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "This is my awesome editor!",
        level: 1,
      },
    },
  ],
};

export const EDITOR_BLOCK_ID = "editor-block";
