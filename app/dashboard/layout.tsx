import CurrentRole from "./_components/current-role";
import SignOut from "./_components/sign-out";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CurrentRole />
      <SignOut />
      {children}
    </>
  );
}
