export interface ServerToClientEvents {
  updateData: (data: any) => void;
  notify: (message: NotificationType) => void;
}

export type NotificationType = {
  notif_title: string;
  notif_description: string;
  notif_link: string;
};
