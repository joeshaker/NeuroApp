export interface Enrollment {
  id: number;
  enrollmentDate: string;
  progressPercentage: number;
  stdId: number;
  courseId: number;
  courseTitle: string;
  courseDescription: string;
  courseImageUrl: string;
  isDeleted: boolean;
  isCanceled: boolean;
  status: string;
  student: {
    id: number;
    isBlocked: boolean;
    isDeleted: boolean;
    userId: string;
    user: any; // or define a User model later
  };
  course?: Course; // optional - if you want to join with course info
}
export interface Course {
  id: number;
  title: string;
  thumbnailUrl: string;
  instructorName: string;
  description: string;
}
