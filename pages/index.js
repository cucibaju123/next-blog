import { createClient } from 'contentful'
import PostCard from '../components/PostCard'
import styles from '../styles/index.module.css'


export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  const res = await client.getEntries({ content_type: 'blogPost' })

  return {
    props: {
      posts: res.items
    },
    revalidate: 1
  }
}

export default function Recipes({ posts }) {
  console.log(posts)
  return (
    <div className={styles.recipeList}>
      { posts.map(post => (
        <PostCard key={post.sys.id} post={post} />
      ))}
    </div>
  )
}