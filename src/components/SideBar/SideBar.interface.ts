import { ReactNode } from 'react';

export interface Props {}
export interface Path {
  label: string;
  icon?: ReactNode;
  path?: string;
}

export interface PathConfig extends Path {
  subMenus?: Path[];
}
