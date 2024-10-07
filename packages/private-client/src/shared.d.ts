// declare module '@shared' {
//   export const Header: React.FC;
//   export const Footer: React.FC;
//   export const PostCard: React.FC<PostCardProps>;
//   export const HeaderButton: React.FC<ButtonProps>;
// }
declare module '@shared' {
  export { Header } from '../../shared-components/Header';
  export { Footer } from '../../shared-components/Footer';
  export { PostCard } from '../../shared-components/PostCard';
  export { HeaderButton } from '../../shared-components/HeaderButton';
  export { MainPostCard } from '../../shared-components/MainPostCard';
  export { CommentSection } from '../../shared-components/CommentSection';
}
