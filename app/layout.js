export const metadata = {
  title: 'איפה עידן גרה?',
  description: 'התשובה הרשמית והמעודכנת',
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
