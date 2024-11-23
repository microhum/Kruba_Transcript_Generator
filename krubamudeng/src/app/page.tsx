import Head from 'next/head';
import Chatbot from './components/chatbot';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Chatbot</title>
        <meta name="description" content="Simple chatbot interface" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <Chatbot />
      </main>
    </div>
  );
};

export default Home;
