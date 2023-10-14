import React from "react";
import TextEditor from "./Components/TextEditor/TextEditor";
import { format } from "date-fns";

function App() {
  const currentDate = format(new Date(), "dd.MM.yyyy");
  return <TextEditor date={currentDate} />;
}

export default App;
