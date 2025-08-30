import Footer from "components/Footer";
import Header from "components/header/Header";

export default function WithNavFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
