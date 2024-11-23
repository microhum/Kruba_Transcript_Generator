type Query = {
    kruba: string;
    mudeng: string;
    enemy: string;
    story_extend: string;
};

type Message = {
  role: 'user' | 'kruba' | 'enemy' | 'mudeng';
  text: string;
};

type Transcript = {
  transcript: Message[]
  detail: string | null
}