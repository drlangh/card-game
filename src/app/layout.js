import './globals.css';
import { Josefin_Sans, Poppins } from 'next/font/google';

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--josefin-sans',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata = {
  title: 'Healthy vs. Toxic Masculinity',
  description:
    'Explore meaningful conversation starter cards about healthy and toxic masculinity by challenging stereotypes, spark dialogue, and foster growth in a safe, judgment-free space. Start building a more authentic and inclusive masculinity today!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} ${poppins.className} antialiased`}
      >
        <div className="flex items-center justify-center w-screen h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
