import { MatterHeading } from "@/components/hero/matter-heading";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-6xl">
        <MatterHeading />
      </div>
    </div>
  );
}
