import React from 'react';

export const metadata = {
  title: 'LittleLink Server',
  description: 'A littlelink based link page',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
