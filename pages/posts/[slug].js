import { createClient } from 'contentful'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from '../../styles/[slug].module.css'
import dateFormat from 'dateformat'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export async function getStaticPaths() {
  const res = await client.getEntries({
    content_type: 'blogPost'
  })

  const paths = res.items.map(item => {
    return {
      params: {
        slug: item.fields.slug
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({ content_type: 'blogPost', 'fields.slug': params.slug })
  return {
    props: {
      post: items[0]
    },
    revalidate: 1
  }
}

export default function RecipeDetails({ post }) {
  const { featuredImage, title, readingTime, postContent, createdAt } = post.fields
  console.log(post)
  return (
    <div>
      <div className={styles.banner}>
        <Image
          src={'https:' + featuredImage.fields.file.url}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
        />
        <h2>{title}</h2>
      </div>

      <div className={styles.info}>
        <p>{dateFormat(createdAt, "mediumDate")} - {readingTime} min read</p>
        <h3>Tags: </h3>
        <div className={styles.tags}>
          {post.metadata.tags.map(tag => (
            <span key={tag.sys.id}>
              { tag.sys.id}
            </span>
          ))}
        </div>

        <div className={styles.method}>
          <div>{documentToReactComponents(postContent)}</div>
        </div>
      </div>
    </div>
  )
}