import { MatterHeading } from "@/components/hero/matter-heading";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-16">
      <div className="relative z-10 w-full max-w-6xl">
        <MatterHeading />
      </div>
      <BackgroundBeams />
    </div>
  );
}
