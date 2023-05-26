export interface MessageViewModel {
  id: number;
  sent: string;
  text: string;
  user: {
    name: string;
    avatarURL: string;
    color: string;
  };
  fromUser1: boolean;
}