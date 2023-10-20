import React, { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateDiaryEntry } from "../../Features/Diary/diarySlice";
import {
  EDITOR_TOOLS,
  DEFAULT_INITIAL_DATA,
  EDITOR_BLOCK_ID,
} from "./editorConfig";
import EditorJS from "@editorjs/editorjs";
import { db, auth } from "../../Firebase";
import {
  addDoc,
  collection,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
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
    if (!uid) {
      console.log("[TextEditor]: no uid, impossible to save");
      return;
    }

    const editorData = await ejInstance.current?.saver?.save();
    if (!editorData) {
      console.log("[TextEditor]: no data to save");
      return;
    }

    try {
      const dayCollection = collection(db, "users", uid, year);

      const dataToStore = {
        ...diaryData,
        ...editorData,
        day,
        month,
        year,
      };

      const daysQuery = query(
        dayCollection,
        where("year", "==", year),
        where("month", "==", month),
        where("day", "==", day)
      );
      const documents = await getDocs(daysQuery);

      if (documents.size > 0) {
        const docRef = documents.docs[0].ref;
        await setDoc(docRef, dataToStore);
        console.log("[TextEditor] edited existing document", dataToStore);
      } else {
        await addDoc(dayCollection, dataToStore);
        console.log("[TextEditor] added new document", dataToStore);
      }
    } catch (e) {
      console.error("[TextEditor]: error saving diary", e);
    }
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
