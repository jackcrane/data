import { useEffect, useState } from "react";

export const useUndo = (update) => {
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const createCheckpoint = (data) => {
    // If we're not at the end of history, slice off the future
    let newHistory = history.slice(0, historyIndex + 1);

    // Add the new data
    newHistory.push(data);

    // Ensure we're only keeping the most recent 100 changes
    if (newHistory.length > 100) {
      // Remove the oldest entries to maintain a max length of 100
      newHistory = newHistory.slice(newHistory.length - 100);
    }

    setHistory(newHistory);
    // Adjust historyIndex if we removed some history due to overflow
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      update(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      update(history[historyIndex + 1]);
    }
  };

  return {
    createCheckpoint,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
  };
};
