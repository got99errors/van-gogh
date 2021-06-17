import { getPosts } from "../lib/functions";
import Link from "next/link";
import Head from "next/head"
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

const Index = ({posts}) => (
  <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Let's just see where this whole thing takes us to.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Posts</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ slug, published_at, title }) => (
            <li className={utilStyles.listItem} key={slug}>
            <Link href={`/posts/${slug}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={published_at} />
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  // <ul>
  //   {props.posts.map((post) => (
  //     <li key={post.id}>
  //       <Link href={`/posts/${post.slug}`}>
  //         <a>title: {post.title}</a>
  //       </Link>
  //     </li>
  //   ))}
  // </ul>
);

export default Index;

export async function getStaticProps(context) {
  const posts = await getPosts();

  if (!posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: { posts },
    revalidate: 1,
  };
}