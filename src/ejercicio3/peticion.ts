
import { Funko } from "./Funko.js";


export interface Peticion {
  acction: string;
  user: string;
  id: number;
  name: string;
  description: string;
  type: string;
  gender: string;
  franchise: string;
  number: number;
  exclusive: boolean;
  specialFeatures: string;
  marketValue: number;
}


export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  nameuser?: string;
  namefunko?: number;
  funkoPop?: Funko;
}

export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  funkopops?: Funko[];
}