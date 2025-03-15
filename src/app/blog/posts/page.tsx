import { posts } from '@/app/lib/placeholder-data'

export default function Page(){
    return (
        <>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}