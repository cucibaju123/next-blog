import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/PostCard.module.css'

const PostCard = ({ post }) => {

    const { title, readingTime, slug, thumbnail } = post.fields
    return (
        <div className={styles.card}>
            <div className={styles.featured}>
                <Image
                    src={'https:' + thumbnail.fields.file.url}
                    // width={thumbnail.fields.file.details.image.width}
                    width={550}
                    // height={thumbnail.fields.file.details.image.height}
                    height={300}
                />
            </div>
            <div className={styles.content}>
                <div className={styles.info}>
                    <h4>{title}</h4>
                    <p>{readingTime} min read</p>
                </div>
                <div className={styles.actions}>
                    <Link href={'/posts/' + slug}>
                        <a >Read</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PostCard
