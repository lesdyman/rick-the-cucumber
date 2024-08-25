import { Navbar } from "../components/navbar";

export default function Home() {
  return (
    <>
      <header className="mb-10">
        <Navbar />
      </header>

      <main className="pt-5 min-h-screen flex flex-col items-center m-10">
        <h2 className="mb-4 text-3xl font-bold">Looking for something, huh?</h2>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-screen-lg"
        />
      </main>
    </>
  );
}
