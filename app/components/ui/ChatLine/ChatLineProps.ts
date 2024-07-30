export default interface ChatLineProps {
  message: {
    user: {
      name: string;
      avatar: string;
    };
    text: string;
    timestamp?: number;
  };
}