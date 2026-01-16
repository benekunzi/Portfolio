import { SmoothScroll } from "@/components/smooth-scroll";
import { CursorProvider } from "@/context/cursor-context";
import CustomCursor from "@/components/custom-cursor";
import "./globals.css";

export const metadata = {
  title: "Benedict Kunzmann Portfolio",
  description: "Software Developer for Mobile and Python",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="cursor-none">
        <CursorProvider>
          <CustomCursor />
          <SmoothScroll>{children}</SmoothScroll>
        </CursorProvider>
      </body>
    </html>
  );
}
