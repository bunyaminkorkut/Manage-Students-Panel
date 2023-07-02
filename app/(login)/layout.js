export default function RootLayout({
  children,
}) {
  return (
    <body className='overscroll-none' style={{ 'background': 'linear-gradient(49deg, #FEAF00 0%, #F8D442 100%)' }}>
      {children}
    </body>
  )
}
