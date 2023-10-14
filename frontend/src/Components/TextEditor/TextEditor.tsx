import React, { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateDiaryEntry } from "../../Features/Diary/diarySlice";
import {
  EDITOR_TOOLS,
  DEFAULT_INITIAL_DATA,
  EDITOR_BLOCK_ID,
} from "./editorConfig";
import EditorJS from "@editorjs/editorjs";

interface IDiaryEditorProps {
  date: string;
}

const TextEditor: React.FC<IDiaryEditorProps> = ({ date }) => {
  const dispatch = useAppDispatch();
  const initialData = useAppSelector((state) => state.diary[date]);

  const ejInstance = useRef<EditorJS | null>();

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITOR_BLOCK_ID,
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: initialData ?? DEFAULT_INITIAL_DATA,
      onChange: async () => {
        const { blocks, version, time } = await editor.saver.save();
        dispatch(updateDiaryEntry({ date, blocks, version, time }));
      },
      tools: EDITOR_TOOLS,
    });
  };

  return <div id={EDITOR_BLOCK_ID} />;
};

export default TextEditor;
