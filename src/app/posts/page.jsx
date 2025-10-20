import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 pt-40">
      <Image
        src="/wip.png"
        alt="Posts are a work in progress!"
        width={300}
        height={200}
        className="mb-6"
      />
      <p className="text-2xl font-bold text-[#b2bfa8]">Come back to this page soon!</p>
    </div>

    
  );
}