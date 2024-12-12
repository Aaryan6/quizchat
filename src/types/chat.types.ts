// TODO refactor and remove unneccessary duplicate data.
export interface Chat extends Record<string, any> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: any[];
  sharePath?: string; // Refactor to use RLS
}
