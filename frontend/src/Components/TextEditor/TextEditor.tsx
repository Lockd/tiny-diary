import React, { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateDiaryEntry, saveDiary } from "../../Features/Diary/diarySlice";
import {
  EDITOR_TOOLS,
  DEFAULT_INITIAL_DATA,
  EDITOR_BLOCK_ID,
} from "./editorConfig";
import EditorJS from "@editorjs/editorjs";
import { auth } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface IDiaryEditorProps {
  day: string;
  month: string;
  year: string;
}

const TextEditor: React.FC<IDiaryEditorProps> = ({ day, month, year }) => {
  const dispatch = useAppDispatch();
  const [user] = useAuthState(auth);
  const uid = user?.uid;
  const diaryData = useAppSelector(
    (state) => state.diary?.[year]?.[month]?.[day]
  );
  const ejInstance = useRef<EditorJS | null>();

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      if (ejInstance.current) {
        saveDataToFirebase();

        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  const saveDataToFirebase = async () => {
    dispatch(saveDiary({ day, month, year, uid }));
  };

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITOR_BLOCK_ID,
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: diaryData ?? DEFAULT_INITIAL_DATA,
      onChange: async () => {
        const editorData = await editor?.saver?.save();
        if (!editorData) return;

        dispatch(updateDiaryEntry({ day, month, year, ...editorData }));
        ejInstance.current = editor;
      },
      tools: EDITOR_TOOLS,
    });
  };

  return (
    <>
      <h2>Enter your diary below</h2>
      <div id={EDITOR_BLOCK_ID} />
    </>
  );
};

export default TextEditor;
