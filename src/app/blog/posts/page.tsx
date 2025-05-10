import { Feather, Plus } from "lucide-react";
import Link from "next/link";
import { connectToDB, getPosts } from '@/app/lib/data';
import Post from '@/app/ui/components/posts/Post';

export default async function Page() {
    const client = await connectToDB();
    const posts = await getPosts();

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
            {/* Hero Section - Keeping just this part as shown in screenshot */}
            <section className="pt-16 pb-10 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-sky-100 rounded-full text-sm font-medium mb-6">
                            <Feather className="text-sky-600 mr-2" size={14} />
                            <span className="text-sky-800">Our Blog</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="text-sky-600">Penflare</span> <span className="text-gray-800">Posts</span>
                        </h1>

                        <p className="text-lg text-gray-600 mb-8">
                            Explore our collection of stories, insights, and ideas from writers around the world.
                        </p>

                        {/* Fix 1: Change href to match routing structure */}
                        <div className="relative flex justify-center z-10">
                            <Link href="/blog/post/insert">
                                {/* Fix 2: Make entire button a clickable link */}
                                <button className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-8 rounded-full inline-flex items-center shadow-md transition-colors cursor-pointer">
                                    <Plus size={18} className="mr-2" />
                                    Create New Post
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>

                {/* Simple decorative element */}
                <div className="absolute top-20 left-1/4 w-48 h-48 rounded-full bg-sky-200 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-sky-300 opacity-10 blur-3xl"></div>
            </section>

            {/* Posts Section - Fixed to properly display posts using the original Post component */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {!posts || posts.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">No posts yet</h3>
                                <p className="text-gray-600 mb-6">Be the first to create content on Penflare!</p>
                                {/* Fix 3: Change href here too for consistency */}
                                <Link href="/create-post">
                                    <span className="bg-sky-100 text-sky-700 hover:bg-sky-200 py-2 px-6 rounded-full font-medium transition-colors inline-flex items-center">
                                        <Plus size={16} className="mr-2" />
                                        Write your first post
                                    </span>
                                </Link>
                            </div>
                        ) : (
                            // Use the original Post component that was imported from the existing code
                            <div className="space-y-6">
                                {posts.map((post) => (
                                    <Post key={post.id} {...post} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}