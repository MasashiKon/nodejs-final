"use client";

import Link from "next/link";
import React, { useState } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DropResult } from "react-beautiful-dnd";


// const wordsPool = ["能力", "越大", "責任", "越大"];

const page = () => {
  const [wordsPool, setWordsPool] = useState([
    { word: "能力", order: 0 },
    { word: "越大", order: 1 },
    { word: "責任", order: 2 },
    { word: "越大", order: 3 },
  ]);
  const [answerField, setAnswerField] = useState<
    { word: string; order: number }[]
  >([]);
  const [result, setResult] = useState("");

  const correctAnswer = "能力越大責任越大";

  const handleDragDrop = (results: DropResult) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (
      source.droppableId === "wordsPool" &&
      destination.droppableId === "answerField"
    ) {
      const reorderedWordsPool = [...wordsPool];
      const reorderedAnswerField = [...answerField];
      const destinationIndex = destination.index;
      const sourceIndex = source.index;

      const [removedWord] = reorderedWordsPool.splice(sourceIndex, 1);
      reorderedAnswerField.splice(destinationIndex, 0, removedWord);

      setAnswerField(reorderedAnswerField);
      setWordsPool(reorderedWordsPool);

      return;
    }

    if (
      source.droppableId === "answerField" &&
      destination.droppableId === "wordsPool"
    ) {
      const reorderedWordsPool = [...wordsPool];
      const reorderedAnswerField = [...answerField];
      const sourceIndex = source.index;

      const [removedWord] = reorderedAnswerField.splice(sourceIndex, 1);
      reorderedWordsPool.splice(removedWord.order, 0, removedWord);

      setAnswerField(reorderedAnswerField);
      setWordsPool(reorderedWordsPool);

      return;
    }

    if (
      source.droppableId === "answerField" &&
      destination.droppableId === "answerField"
    ) {
      const reorderedAnswerField = [...answerField];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedWord] = reorderedAnswerField.splice(sourceIndex, 1);
      reorderedAnswerField.splice(destinationIndex, 0, removedWord);

      setAnswerField(reorderedAnswerField);

      return;
    }

    if (
      source.droppableId === "wordsPool" &&
      destination.droppableId === "wordsPool"
    )
      return;
  };

  const handleSubmit = () => {
    const answer = answerField.reduce((prev, corr) => {
      return prev + corr.word;
    }, "");

    if (answer === correctAnswer) {
      setResult("correct");
    } else {
      setResult("wrong");
    }
  };

  const handleReset = () => {
    setResult("");
  }

  return (
    <div className="h-screen bg-slate-200 grid place-content-center">
      <DragDropContext onDragEnd={handleDragDrop}>
        <h1 className="text-2xl">
          With great power comes great responsibility
        </h1>
        <br />
        <Droppable droppableId="answerField" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`border-solid border-2 border-slate-800 h-11 flex items-center ${result ? (result === "correct" ? "bg-emerald-300" : "bg-red-300") : ""} `}
            >
              {answerField.map((wordObj, index) => (
                <Draggable
                  draggableId={wordObj.word + wordObj.order}
                  key={wordObj.word + wordObj.order}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className="border-solid border-2 w-9 h-7 rounded-md"
                    >
                      {wordObj.word}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <br />
        <Droppable droppableId="wordsPool" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="border-solid border-2 border-slate-800 p-8 flex justify-between"
            >
              {wordsPool.map((wordObj, index) => (
                <Draggable
                  draggableId={wordObj.word + wordObj.order}
                  key={wordObj.word + wordObj.order}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className="border-solid border-2 border-slate-800 w-9 h-7 rounded-md"
                    >
                      {wordObj.word}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <br />
      {result ? (result === "correct" ? <button><Link href={"/"}>Back to home</Link></button> : <button onClick={handleReset}>Retry</button>) : <button onClick={handleSubmit}>Submit</button>}
    </div>
  );
};

export default page;
