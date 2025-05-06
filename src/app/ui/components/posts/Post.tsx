import React from 'react';
import Link from 'next/link';

export default function Component({ id, title, content, date }: { id: string, title: string, content: string, date: string }) {
    return (
        <div key={id} className="border border-sky-100 hover:border-sky-200 rounded-2xl p-4 my-4">
            <Link className={'text-sky-700'} href={`/blog/post/${id}`}><h2>{title}</h2></Link>
            <p className="text-gray-500">{date}</p>
            <p>{content}</p>
        </div>
    );
}

