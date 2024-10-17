// app/layout.tsx
// globals.css includes @tailwind directives
// adjust the path if necessary
import "./styles/globals.css";
import {Providers} from "./providers";


export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className='dark'>
      <body className="light text-foreground bg-background">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}