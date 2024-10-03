// declare module '@shared' {
//   export const Header: React.FC;
//   export const Footer: React.FC;
//   export const PostCard: React.FC<PostCardProps>;
//   export const HeaderButton: React.FC<ButtonProps>;
// }

// shared.d.ts in shared-components/src/
declare module '@shared' {
  export { Header } from './Header';
  export { Footer } from './Footer';
  export { PostCard } from './PostCard';
  export { HeaderButton } from './HeaderButton';
}

// import React from 'react';

// declare module '@shared' {
//   export interface PostCardProps {
//     id: string | number;
//     title: string;
//     content: string;
//     author: string;
//     createdAt: string;
//   }

//   export interface ButtonProps
//     extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//     variant?: 'default' | 'outline' | 'ghost';
//     size?: 'default' | 'sm' | 'lg';
//     asChild?: boolean;
//     href?: string;
//   }

//   export const Header: React.FC;
//   export const Footer: React.FC;
//   export const PostCard: React.FC<PostCardProps>;
//   export const HeaderButton: React.FC<ButtonProps>;
// }
