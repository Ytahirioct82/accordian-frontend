import data from "./data";
import { useState } from "react";
import "./styles.css";

function Accordian() {
  const [selectedId, setSelectedId] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  // Sets the currentId to the selectedId state so it displays the answer on line 55
  function handleSingleSelection(currentId) {
    setSelectedId(currentId);
  }

  // adds the currentId to the multiple state if it does'nt exist but removes it from the array if it exist.
  // doing this will display all answers on line 55 that are present inside the multiple state array.
  function handleMultiSelection(currentId) {
    let copyMultiple = [...multiple];

    const findIndexOfCurrentId = copyMultiple.indexOf(currentId);

    if (findIndexOfCurrentId === -1) copyMultiple.push(currentId);
    else copyMultiple.splice(findIndexOfCurrentId, 1);

    setMultiple(copyMultiple);
  }

  // Toggles line 39 button between disable and enable depending on if the enableMultiSelection is true or false.
  let multiSelectionButton = enableMultiSelection ? "Disable Multi Selection" : "Enable Multi Selection";

  return (
    <div className="wrapper">
      <button
        onClick={() => {
          /* changes the state of enableMultiSelection to the opposite and clears selectedId and multiple
             states so no answers display
          */
          setEnableMultiSelection(!enableMultiSelection);
          setSelectedId(null);
          setMultiple([]);
        }}
      >
        {multiSelectionButton}
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => {
            return (
              <div className="item" key={dataItem.id}>
                <div
                  onClick={
                    // If enableMultiSelection is truthy it will trigger the handleMultiSelection function on line 17.
                    // If enableMultiSelection is falsy it will trigger the handleSingleSelection function on line 11.
                    enableMultiSelection
                      ? () => handleMultiSelection(dataItem.id)
                      : () => handleSingleSelection(dataItem.id)
                  }
                  className="title"
                >
                  <h3>{dataItem.question}</h3>
                  <span>+</span>
                </div>

                {
                  /* will only display the answers for the id that is present in the multiple state array or
                selectedId state*/
                  selectedId === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ? (
                    <div className="content">{dataItem.answer}</div>
                  ) : null
                }
              </div>
            );
          })
        ) : (
          <div>No Data found</div>
        )}
      </div>
    </div>
  );
}

export default Accordian;
