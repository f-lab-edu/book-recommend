import BookList from "@/components/book/BookList";
import SuspenseBoundary from "@/components/common/SuspenseBoundary";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Book Recommend</title>
        <meta name="description" content="Book Recommend to Frontend Developer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <SuspenseBoundary>
        <BookList />
      </SuspenseBoundary>
    </>
  );
}
