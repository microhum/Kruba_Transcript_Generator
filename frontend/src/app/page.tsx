"use client";
import Head from "next/head";
import Chatbox from "./components/chatbox";
import { useState } from "react";
import { useAppContext, AppProvider } from "./context/context";


const Home = () => {
  return (
    <AppProvider>
      <HomeContent />
    </AppProvider>
  );
};

const HomeContent = () => {
  const { active, setActive, query, setQuery, messages, setMessages } = useAppContext();
  const getMessage = async (query: Query) => {
    try {
      const response = await fetch('http://localhost:8000/invoke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.response;
      
    } catch (error) {
      console.error('Error sending message to API:', error);
      return null;
    }
  };

  const updateMessages = async () => {
    const response: Transcript = await getMessage(query);
    console.log(response.transcript);
    if (response && response.transcript) {
      setMessages(response.transcript);
      console.log("new messages: ", messages);
    }
  };
  return (
      <div>
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
          {active ? (
            <Chatbox query={query}/>
          ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateMessages();
              setActive(true);
            }}
            className="space-y-4 text-black"
          >
            <div>
              <label htmlFor="kruba" className="block text-sm font-medium text-gray-700">
                ครูบา ชื่ออะไร?
              </label>
              <input
                type="text"
                id="kruba"
                value={query.kruba}
                onChange={(e) => setQuery({ ...query, kruba: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="mudeng" className="block text-sm font-medium text-gray-700">
                หมูเด้ง ชื่ออะไร?
              </label>
              <input
                type="text"
                id="mudeng"
                value={query.mudeng}
                onChange={(e) => setQuery({ ...query, mudeng: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="enemy" className="block text-sm font-medium text-gray-700">
                ปีศาจร้าย คือตัวอะไร?
              </label>
              <input
                type="text"
                id="enemy"
                value={query.enemy}
                onChange={(e) => setQuery({ ...query, enemy: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
                <div>
                <label htmlFor="story_extend" className="block text-sm font-medium text-gray-700">
                  เนื้อเรื่องเพิ่มเติม (optional)
                </label>
                <input
                  type="text"
                  id="story_extend"
                  value={query.story_extend}
                  onChange={(e) => setQuery({ ...query, story_extend: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
          )}
        </main>
      </div>
  );
};

export default Home;