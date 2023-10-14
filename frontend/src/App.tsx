import React from "react";
import TextEditor from "./Components/TextEditor/TextEditor";
import CalendarManager from "./Components/Calendar/CalendarManager";
import { format } from "date-fns";

function App() {
  const currentDate = format(new Date(), "dd.MM.yyyy");
  return <CalendarManager />;
  // return <TextEditor date={currentDate} />;
}

export default App;
