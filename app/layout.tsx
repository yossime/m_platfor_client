import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProjectProvider } from "./context/useProjectContext";
import AuthWrapper from "./AuthWrapper";
import { poppins, figtree } from "./fonts";
import StyledComponentsRegistry from "./registry";
import { EditorProvider } from "./context/useEditorContext";
import { UserProvider } from "./context/useUserContext";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mocart",
  icons: {
    icon: "/LogoIcon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${figtree.variable}`}>
      <body className={inter.className}>
        <StyledComponentsRegistry>
        <AuthProvider>
          <UserProvider>
            <ProjectProvider>
              <EditorProvider>
                <AuthWrapper>
               {children}
                </AuthWrapper>
              </EditorProvider>
            </ProjectProvider>
          </UserProvider>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
