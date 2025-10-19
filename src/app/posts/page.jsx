import Image from "next/image";

export default function Page() {
  return (
    <div className="flex justify-center align-center pt-30 pb-38">
      <Image
        src={"/wip.png"}
        alt={"posts are a work in progress!"}
        width={300}
        height={200}
      />
    </div>
  );
}
