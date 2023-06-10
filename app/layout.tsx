import './globals.css';
import { ChatMemberProvider } from './components/features/ChatList/ChanelListContext';
import { AuthProvider } from '@/app/components/features/LoginForm/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AuthProvider>
          <ChatMemberProvider>
            {children}
          </ChatMemberProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
