export interface ServerToClientEvents {
  updateData: (data: any) => void;
  notify: (message: string) => void;
}
