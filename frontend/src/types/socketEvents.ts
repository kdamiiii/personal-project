export interface ServerToClientEvents {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateData: (data: any) => void;
  notify: (message: NotificationType) => void;
}

export type NotificationType = {
  notif_title: string;
  notif_description: string;
  notif_link: string;
};
