import React, { useState } from "react";
import Widget from "./WidgetList/Widget";

function App() {
  let newItems = [
    { id: "1", title: "one" },
    { id: "2", title: "two" },
    { id: "3", title: "three" ,colspan:2},
    { id: "4", title: "four" },
    { id: "5", title: "five" },
    { id: "6", title: "six" },
    { id: "7", title: "seven" },
    { id: "8", title: "eight" }, 
  ];
  const [items, setItems] = useState(newItems);
  return (
    <div className="transition-all p-20 space-x-2 duration-400 ease-in-out mt-2 cursor-pointer hover:bg-blue-500 flex text-base bg-blue-400 h1 ">
      <Widget items={items} setItems={setItems} />
    </div>
  );
}

export default App;
