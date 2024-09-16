import NavBar from "@/components/frontoffice/navbar";
import Footer from "@/components/frontoffice/footer";

export default function AcceuilLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-gray-100">{children}</div>;
}
