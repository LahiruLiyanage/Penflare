import { notFound } from "next/navigation";
// import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';
import { getPosts } from "@/app/lib/data";

type PageParams = {
    id: string;
};

export default async function Page({ params }: { params: PageParams }) {
    const posts = await getPosts();

    // Handle the case where posts is undefined
    if (!posts) {
        notFound();
    }

    // Find the post by ID
    const post = posts.find((post) => post.id === params.id);

    // If post not found, show 404
    if (!post) {
        notFound();
    }

    return (
        <>
            <h1 className="text-sky-700">Post</h1>
            <Post
                id={post.id}
                title={post.title}
                content={post.content}
                date={post.date}
            />
        </>
    );
}