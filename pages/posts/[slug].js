import Layout from "../../components/layout";
import { getSinglePost, getPosts } from "../../lib/functions";
import Head from "next/head";
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import styles from "../../components/layout.module.css";
import Link from "next/link";

const PostPage = ({ post }) => {
  return (
    <Layout>
        <Head>
          <title>{post.title}</title>
        </Head>
        <img className={utilStyles.featureImage} src={post.feature_image} />
        <article>
          <h1 className={utilStyles.headingXl}>{post.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={post.published_at} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
        <div className={styles.backToHome}>
					<Link href="/">
						<a>← Back to home</a>
					</Link>
				</div>
      </Layout>
  );
};

export default PostPage;

export async function getStaticPaths() {
  const posts = await getPosts();

  // Get the paths we want to create based on posts
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  // "fallback: false" gives us a 404 if post not found
  return { paths, fallback: false };
}

// Pass the page slug to "getSinglePost()" function
// Which then passes it to "posts.read()" to query the GhostContentAPI
export async function getStaticProps(context) {
  const post = await getSinglePost(context.params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
    revalidate: 1,
  };
}