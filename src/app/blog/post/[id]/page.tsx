import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';

interface PageProps {
    params: { id: string }
}

export default function Page({ params }: PageProps) {
    const post = posts.find((post) => post.id === params.id);
    return (
        <>
            <h1 className={"text-sky-700"}>Post</h1>
            {post && <Post {...post} />}
        </>
    );
}