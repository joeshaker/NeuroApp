export interface IAllCourses {
  id: number
  title: string
  description: string
  thumbnailUrl: string
  price: number
  isFree: boolean
  createdAt: string
  categoryId: number
  instructorId: number
  categoryName: string
  instructorName: string;
  numofModulues?: number; // match backend
  numofVideos?: number;
}
