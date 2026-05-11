import Image from "next/image";
import { MatterHeading } from "@/components/hero/matter-heading";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative aspect-[4/3] w-full overflow-hidden lg:hidden">
        <Image
          src="/profile.jpeg"
          alt="Pascal Brokmeier"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="flex flex-1 flex-col justify-center px-8 py-16 sm:px-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-2xl">
          <MatterHeading />
        </div>
      </div>

      <div
        className="relative hidden shrink-0 self-stretch lg:block"
        style={{ width: "min(42vw, calc(100vh * 5 / 7))" }}
      >
        <Image
          src="/profile.jpeg"
          alt="Pascal Brokmeier"
          fill
          priority
          className="object-cover object-top"
          sizes="42vw"
        />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      </div>
    </div>
  );
}
