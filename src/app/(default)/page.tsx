import Home from '@/components/home/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Trang chủ - JBB",
  description: "Mô tả trang web của bạn",
};


export default function HomePage() {
  return <Home />

}
