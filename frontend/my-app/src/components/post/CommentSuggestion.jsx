import React from 'react';

const CommentSuggestion = ({ onSuggestionClick }) => {
  const suggestions = [
    "Congratulations!",
    "Excellent work!",
    "Great insight!",
    "Well deserved.",
    "Looking great!"
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {suggestions.map((text) => (
        <button
          key={text}
          onClick={() => onSuggestionClick(text)}
          className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export default CommentSuggestion;