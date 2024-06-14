import React, { useState } from 'react';
import './FAQS.css';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

const FAQItem = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAnswer = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="faq-item">
      <div className="question-container" onClick={toggleAnswer}>
        <p className="question">{question}</p>
        {/* {isExpanded ? <MdOutlineKeyboardArrowUp className="icon" /> : <MdOutlineKeyboardArrowDown className="icon" />} */}
      </div>
      {isExpanded && <p className="answer">{answer}</p>}
    </div>
  );
};

export default FAQItem;
