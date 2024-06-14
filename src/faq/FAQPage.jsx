import React from 'react';
import FAQList from './FAQList';

const FAQPage = () => {
    const faqs = [
        { question: 'How do I buy cryptocurrency?', answer: 'You can buy cryptocurrency through online exchanges by creating an account, linking a payment method, and then placing an order to purchase the desired cryptocurrency using fiat currency or other cryptocurrencies.' },
        { question: 'What is Bitcoin?', answer: 'Bitcoin is the first and most well-known cryptocurrency, created by an anonymous person or group of people using the pseudonym Satoshi Nakamoto in 2009. It operates on a decentralized network called blockchain.' },
        { question: 'What is the stock market?', answer: 'The stock market is a place where buyers and sellers trade shares of publicly listed companies. It provides a platform for companies to raise capital and for investors to buy and sell ownership stakes in those companies.' },
        { question: 'How do I invest in the stock market?', answer: 'You can invest in the stock market through brokerage accounts, where you can buy and sell stocks, bonds, mutual funds, and other securities. Researching companies and diversifying your investments are key strategies for success.' },
        { question: 'What are the risks of investing in cryptocurrency?', answer: 'Risks of investing in cryptocurrency include price volatility, regulatory uncertainty, cybersecurity threats, and the potential for market manipulation. It\'s important to thoroughly research before investing and only invest what you can afford to lose.' },
        { question: 'How do I store my cryptocurrency?', answer: 'Cryptocurrency can be stored in digital wallets, which can be hardware devices, software applications, or online platforms. Hardware wallets offer the highest level of security by keeping private keys offline, while software wallets provide convenience for frequent trading.' },
        { question: 'How do I choose which cryptocurrency to invest in?', answer: 'Choosing a cryptocurrency to invest in involves researching factors such as the project\'s technology, team, use case, community support, and market potential. It\'s essential to conduct thorough due diligence and consider diversifying your investments across multiple cryptocurrencies.' },
        { question: 'How do I know if a cryptocurrency is legitimate or a scam?', answer: 'Legitimate cryptocurrencies often have transparent development teams, active communities, clear use cases, and reputable exchanges listing them. It\'s important to research thoroughly and be cautious of projects promising unrealistic returns or lacking transparency.' },
        { question: 'How can I protect my cryptocurrency investments from hacking or theft?', answer: 'Best practices for securing cryptocurrency investments include using hardware wallets, enabling two-factor authentication on exchange accounts, avoiding sharing sensitive information online, and regularly updating security measures.' },
        { question: 'What is market volatility, and how does it impact my investments?', answer: 'Market volatility refers to the degree of variation in stock prices over time. High volatility can lead to rapid fluctuations in portfolio value, while low volatility may indicate stability but potentially lower returns. It\'s essential to consider risk tolerance when investing in volatile markets.' }
    ];
    

  return (
    <div className='FAQ-container'>
      <div className='FAQ-heading'>
        <h1 style={{textAlign:'center', fontFamily:'Inter'}}>Frequently Asked Questions</h1>
      </div>
      
      <FAQList faqs={faqs} />
    </div>
  );
};

export default FAQPage;
