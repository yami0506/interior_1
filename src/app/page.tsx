import "@/styles/futuristic.scss"; // Assuming no changes were specified for the import path

import LandingPage from "@/components/landing-page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <LandingPage />
    </main>
  );
}
