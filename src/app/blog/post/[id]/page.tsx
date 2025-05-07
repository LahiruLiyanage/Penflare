import { notFound } from "next/navigation";
// import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';
import { connectToDB, getPosts } from "@/app/lib/data";

type PageParams = {
    id: string;
};

export default async function Page({ params }: { params: PageParams }) {
    const posts = await getPosts();
    const post = posts?.find((post) => post.id === params.id);

    if (!post) {
        notFound();
    }

    return (
        <>
            <h1 className="text-sky-700">Post</h1>
            {post && <Post {...post} />}
        </>
    );
}