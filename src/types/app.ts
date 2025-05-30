
export interface App {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
  isOpen: boolean;
  zIndex: number;
}

export interface WindowPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}
