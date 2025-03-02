import './globals.css';
import { Roboto_Flex, Poppins, Handlee } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import InfoIcon from '@/components/InfoIcon';
import AnimatedContainer from '@/components/AnimatedContainer';
import PersistentCard from '@/components/persistentCard';

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  display: 'auto',
  axes: ['wdth', 'XTRA', 'YTUC', 'GRAD', 'YTDE'],
  variable: '--roboto-flex',
});

const updock = Handlee({
  subsets: ['latin'],
  weight: '400',
  variable: '--updock',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata = {
  title: 'Masculinity',
  description:
    'Explore meaningful conversation starter cards about healthy and toxic masculinity by challenging stereotypes, spark dialogue, and foster growth in a safe, judgment-free space. Start building a more authentic and inclusive masculinity today!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${robotoFlex.variable} ${poppins.className} ${updock.variable} antialiased`}
      >
        <div className="flex items-center justify-start w-screen min-h-dvh">
          <AnimatedContainer>
            <PersistentCard />
            {children}
          </AnimatedContainer>
        </div>
        <div className="absolute top-6 right-6">
          <InfoIcon />
        </div>
        <ToastContainer />
      </body>
    </html>
  );
}
