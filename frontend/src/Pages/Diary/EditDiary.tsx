import React from "react";
import TextEditor from "../../Components/TextEditor/TextEditor";
import { useParams } from "react-router-dom";

const EditDiary = () => {
  const { year, month, day } = useParams();

  return <TextEditor date={`${day}.${month}.${year}`} />;
};

export default EditDiary;
