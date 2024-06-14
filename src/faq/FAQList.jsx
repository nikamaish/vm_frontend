import React from 'react';
import FAQItem from './FAQItem';

const FAQList = ({ faqs }) => {
  return (
    <div className='FaqList'>
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FAQList;
