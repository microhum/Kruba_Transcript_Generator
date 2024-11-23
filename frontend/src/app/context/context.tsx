import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

type AppState = {
    active: boolean;
    setActive: (active: boolean) => void;
    query: Query;
    setQuery: (query: Query) => void;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
};
type AppProviderProps = {
  children: ReactNode;
};
const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [active, setActive] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState<Query>({
    kruba: "",
    mudeng: "",
    enemy: "",
    story_extend: "",
  });
  const [messages, setMessages] = useState<Message[]>([
    { role: 'mudeng', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { role: 'enemy', text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { role: 'mudeng', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    { role: 'mudeng', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { role: 'mudeng', text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { role: 'enemy', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { role: 'kruba', text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { role: 'enemy', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    { role: 'kruba', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { role: 'enemy', text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { role: 'kruba', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
  ]);

  return (
    <AppContext.Provider value={{ active, setActive, query, setQuery, messages, setMessages, isLoading, setLoading}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
