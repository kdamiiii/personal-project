export default function EnrollmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="flex justify-center items-center w-screen h-screen"
      style={{
        backgroundImage: "url(./photos/bg.svg)",
        backgroundSize: "cover",
      }}
    >
      {children}
    </main>
  );
}
