export type EventCallback = (...args: any[]) => void;

export interface LinkProps {
  id: string;
  content: string;
  onClick?: (e: Event) => void;
}