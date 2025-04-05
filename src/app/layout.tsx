import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GlobalContextProvider } from "@/context/GlobalContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "AWS Demo",
  description: "A demo aws projects for learning purposes",
  icons: {
    icon: [
      { url: "/aws-demo-icon.svg", sizes: "32x32", type: "image/svg" },
      { url: "/aws-demo-icon.svg", sizes: "16x16", type: "image/svg" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}
