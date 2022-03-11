import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Message Me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Lets Build Message Me</h1>
      <Sidebar />
    </div>
  );
}
