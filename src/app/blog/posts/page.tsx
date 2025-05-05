// import {posts} from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';
import { connectToDB, getPosts } from '@/app/lib/data';

export default async function Page() {
    const client = await connectToDB();
    const posts = await getPosts();
    return (
        <>
            {client && <p className={'text-green-500'}>Connected to DB</p> }
            <h1 className={'text-sky-700'}>Posts</h1>
            {posts?.map((post) => <Post key={post.id} {...post} />)}
        </>)
}