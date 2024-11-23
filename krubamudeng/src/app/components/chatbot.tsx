"use client"

import { useState, FormEvent } from 'react';

// Define types for the message structure
type Message = {
  role: 'user' | 'kruba' | 'enemy' | 'mudeng';
  text: string;
};

const Chatbot = () => {
  // Set the initial state type to Message[]
  const [messages, setMessages] = useState<Message[]>([
    { role: 'mudeng', text: 'kruba ช่วยด้วยเจ้า dinosaur จะกิน mudeng kruba ช่วยด้วยเจ้า dinosaur จะกิน mudeng' },
    { role: 'enemy', text: 'อย่ามายุ่งกับข้าข้าจะกินเจ้า mudeng อย่ากินเจ้า mudeng นะ' },
    { role: 'mudeng', text: 'โอย โอย โอย kruba ช่วย mudeng ด้วย' },
    { role: 'mudeng', text: 'ไชโย ไชโย kruba ปราบเจ้า dinosaur ได้แล้ว' },
    { role: 'mudeng', text: 'kruba มีเมตตา kruba รัก mudeng kruba รัก dinosaur kruba ช่วย dinosaur' },
    { role: 'enemy', text: 'dinosaur ขอโทษ kruba dinosaur ขอโทษ mudeng dinosaur รัก kruba dinosaur รัก mudeng kruba ช่วย mudeng' },
    { role: 'kruba', text: 'kruba ช่วย mudeng kruba ช่วย dinosaur kruba mudeng ช่วยผู้ประสบภัยสาธุสาธุ' },
    { role: 'enemy', text: 'dinosaur ขอโทษ kruba dinosaur ขอโทษ mudeng dinosaur รัก kruba dinosaur รัก mudeng kruba ช่วย mudeng' },
    { role: 'kruba', text: 'kruba ช่วย mudeng kruba ช่วย dinosaur kruba mudeng ช่วยผู้ประสบภัยสาธุสาธุ' },
    { role: 'enemy', text: 'dinosaur ขอโทษ kruba dinosaur ขอโทษ mudeng dinosaur รัก kruba dinosaur รัก mudeng kruba ช่วย mudeng' },
    { role: 'kruba', text: 'kruba ช่วย mudeng kruba ช่วย dinosaur kruba mudeng ช่วยผู้ประสบภัยสาธุสาธุ' }
  ]);

  // Define the event type for form submission
  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    const message = (e.target as HTMLFormElement).message.value;
    if (message) {
      setMessages([...messages, { role: 'user', text: message }]);
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="flex flex-col mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10">
        <div className="text-black text-2xl self-center justify-center">Moo-Deng Kruba Generator</div>
      <div className="space-y-4 overflow-auto h-96 bg-white p-4 rounded-lg shadow-inner">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start ${message.role === 'user' ? 'justify-end' : ''}`}>
            <div
              className={`flex flex-col max-w-4xl ${message.role === 'user' ? 'bg-blue-500 text-white' : message.role === 'kruba' ? 'bg-green-500 text-white' : message.role === 'enemy' ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'} p-3 rounded-lg shadow-md`}>
              <span className="text-md">{message.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* <form onSubmit={handleSendMessage} className="flex items-center mt-4">
        <input
          type="text"
          name="message"
          className="w-full p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition-colors">
          Send
        </button>
      </form> */}
    </div>
  );
};

export default Chatbot;
