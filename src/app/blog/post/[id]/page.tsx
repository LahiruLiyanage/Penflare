import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    const post = posts.find((post) => post.id === id);

    return (
        <>
            <h1>Post</h1>
            <Post {...post} />
        </>
    );
}