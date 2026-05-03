// src/lib/types.ts

// TypeScript types for the application's entities

// User type
export type User = {
    id: number;
    name: string;
    email: string;
    role: 'student' | 'instructor' | 'admin';
};

// Course type
export type Course = {
    id: number;
    title: string;
    description: string;
    createdBy: User;
};

// Lesson type
export type Lesson = {
    id: number;
    title: string;
    content: string;
    courseId: number;
};

// Quiz type
export type Quiz = {
    id: number;
    title: string;
    questions: string[];
    lessonId: number;
};

// Progress type
export type Progress = {
    userId: number;
    courseId: number;
    lessonsCompleted: number;
    totalLessons: number;
};

// Certificate type
export type Certificate = {
    id: number;
    userId: number;
    courseId: number;
    issueDate: Date;
};

// Achievement type
export type Achievement = {
    id: number;
    title: string;
    description: string;
    userId: number;
};

// ForumPost type
export type ForumPost = {
    id: number;
    userId: number;
    content: string;
    createdAt: Date;
};

// Discussion type
export type Discussion = {
    id: number;
    postId: number;
    userId: number;
    content: string;
    createdAt: Date;
};