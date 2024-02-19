export interface VideoItem {
  videoLink: string;
  title: string;
  subtitle: string;
  views: number;
  upload_date: string;
  description: string;
  thumb: string;
}

export interface DragItem {
  type: string;
  index: number;
}
