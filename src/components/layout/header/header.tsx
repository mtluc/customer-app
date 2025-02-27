import { Input } from "@/components/ui/input";
import { PropsWithChildren } from "react";

export const Header = ({ children }: PropsWithChildren) => {
  return <header className="sticky top-0 bg-primary p-1">
    <div className="relative m-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 bottom-0 w-5 h-5 my-auto text-primary left-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <Input
        type="text"
        placeholder="Nhập tên sản phẩm..."
        className="pl-10 pr-4 bg-white rounded-full text-gray-800 placeholder:text-primary placeholder:italic shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] border-none focus:outline-none "
      />
    </div>
    {children}
  </header>;
};
