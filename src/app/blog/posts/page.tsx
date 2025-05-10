// import {posts} from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';
import { connectToDB, getPosts } from '@/app/lib/data';
import Link from "next/link";
import {Button} from "@/app/ui/components/button";

export default async function Page() {
    const client = await connectToDB();
    const posts = await getPosts();

    return (
        <>
            <div className={''}>
                <h1 className={'text-sky-700'}>Posts</h1>
                <Link href="/blog/post/insert"><Button className="outline border-sky-700 text-sky-700 hover:bg-sky-700 hover:text-white my-5 py-2 px-4 rounded-xl">New Posts +</Button></Link>
            </div>

            {posts?.map((post) => <Post key={post.id} {...post} />)}
        </>)
}