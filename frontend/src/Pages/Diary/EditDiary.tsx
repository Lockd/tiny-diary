import React from "react";
import TextEditor from "../../Components/TextEditor/TextEditor";
import { useParams } from "react-router-dom";
import MoodSelector from "../../Components/MoodSelector/MoodSelector";

const EditDiary = () => {
  const { year, month, day } = useParams();

  return (
    <>
      <MoodSelector day={day!} month={month!} year={year!} />
      <TextEditor day={day!} month={month!} year={year!} />
    </>
  );
};

export default EditDiary;
