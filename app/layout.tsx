import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "신혜원 | Frontend Developer",
  description:
    "React와 TypeScript로 웹을 만듭니다. 네트워크가 끊기거나 저장된 상태가 서버와 어긋났을 때의 처리를 함께 설계합니다.",
};

// 첫 페인트 전에 테마를 정해 새로고침 때 흰 화면이 번쩍이지 않게 한다
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var r=document.documentElement;if(d)r.classList.add('dark');r.style.colorScheme=d?'dark':'light'}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}