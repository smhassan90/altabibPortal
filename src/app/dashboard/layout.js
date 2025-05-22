import ChildrenBody from "@/components/ChildrenBody";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChildrenBody>{children}</ChildrenBody>
      </body>
    </html>
  );
}
