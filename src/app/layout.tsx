import { type Metadata } from "next";
import "@/styles/global-reset.css";
import "@/styles/global.css";
import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "",
  description: "",
  icons: {
    icon: "/assets/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, "font-sans", "dark")}>
      <body>{children}</body>
    </html>
  );
}
