import InitialRouting from "@/components/middleware/initial-routing";

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-aquablue dark:bg-lightgray">
      <InitialRouting />
    </div>
  );
}
