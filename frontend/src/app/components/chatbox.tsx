"use client"

import { useState, FormEvent, useEffect } from 'react';
import { useAppContext } from '../context/context';

const Chatbox = ({ query }: { query: Query }) => {
  const { active, setActive, messages, setMessages } = useAppContext();
  const renderMessages = (messages: Message[], query: Query) => {
    const boldText = (text: string, query: Query) => {
      const regex = new RegExp(`(${query.kruba}|${query.mudeng}|${query.enemy})`, 'gi');
      return text.split(regex).map((part, i) =>
        regex.test(part) ? <b key={i} className='font-semibold'>{part}</b> : part
      );
    };

    return messages.map((message, index) => (
      <div key={index} className={`flex items-start ${message.role === 'user' ? 'justify-end' : ''}`}>
        <div
          className={`flex flex-col max-w-4xl ${message.role === 'user' ? 'bg-blue-500 text-white' : message.role === 'kruba' ? 'bg-green-500 text-white' : message.role === 'enemy' ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'} p-3 rounded-lg shadow-md`}>
          <span className="text-md">{boldText(message.text, query)}</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10">
        <div className="text-black text-2xl self-center justify-center">Moo-Deng Kruba Generator</div>
        <div className="text-black text-2xl self-center justify-center">Kruba {query.kruba}</div>
        <div className="text-black text-2xl self-center justify-center">Moo-Deng {query.mudeng}</div>
        <div className="text-black text-2xl self-center justify-center">Enemy {query.enemy}</div>
        <div className="text-black text-2xl self-center justify-center">Story {query.story_extend}</div>
      <div className="space-y-4 overflow-auto h-96 bg-white p-4 rounded-lg shadow-inner">
        {renderMessages(messages, query)}
      </div>
      <button
        onClick={() => setActive(false)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
      >
        Reset
      </button>

    </div>
  );
};

export default Chatbox;
