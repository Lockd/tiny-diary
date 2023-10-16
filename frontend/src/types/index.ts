import { OutputBlockData } from "@editorjs/editorjs";

export type TBackendDiaryEntry = {
  day: string;
  month: string;
  year: string;
  version?: string;
  time?: number;
  blocks: OutputBlockData[];
};
