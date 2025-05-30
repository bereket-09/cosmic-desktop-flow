
export interface App {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
  isOpen: boolean;
  zIndex: number;
  groups: string[];
}

export interface WindowPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Group {
  id: string;
  name: string;
  color: string;
}
