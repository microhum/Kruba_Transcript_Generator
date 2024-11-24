## LLM Kruba Moodeng Transcript Generator

- This purpose project is to generate transcript follow the pattern of Kruba-Heng Helping Moo-Deng Videos.
- for someone who want to be famous like Kruba-Heng.
- It stupid I knew it.

> [!NOTE]
> This project  is a part of the `Stupid Hackathon 8.125 X KMUTT` !

# Quickstart Guide

## Prerequisites

Make sure you have the following installed on your system:

- Python 3.10 or higher
- Node.js and npm (I use bun tho)
- Poetry (for managing Python dependencies)

## Backend Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/llm-kruba-mudeng.git
   cd llm-kruba-mudeng
   ```
2. **Navigate to the backend directory:**

   ```sh
   cd backend
   ```
3. **Install dependencies:**

   ```sh
   poetry install
   ```
4. **Configure the environment variables:**

   Create a `.env` file in the `backend` directory and add the following content:

   ```properties
   TYPHOON_CHAT_KEY=your-typhoon-chat-key
   ```

   Replace `your-typhoon-chat-key` with your actual Typhoon Chat API key.
5. **Run the backend server:**

   ```sh
   poetry run uvicorn main:app --reload
   ```

## Frontend Setup

1. **Navigate to the frontend directory:**

   ```sh
   cd ../frontend
   ```
2. **Install dependencies:**

   ```sh
   bun install
   ```
3. **Run the frontend server:**

   ```sh
   bun run dev
   ```
