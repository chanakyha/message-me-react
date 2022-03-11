import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Message Me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Lets Build Message Me</h1>
    </div>
  );
}
