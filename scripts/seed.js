const { db } = require("@vercel/postgres");
const { posts } = require("../src/app/lib/placeholder-data.js");

async function seedPosts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "posts" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        author VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log(`Created "posts" table`);

    // Insert data into the "posts" table
    const insertedPosts = await Promise.all(
        posts.map(async (post) => {
          return client.sql`
            INSERT INTO posts (id, title, content, date, author)
            VALUES (${post.id || null}, ${post.title}, 
            ${post.content}, ${post.date}, ${post.user || post.author || 'Unknown Author'})
            ON CONFLICT (id) DO UPDATE SET
            title = ${post.title},
            content = ${post.content},
            date = ${post.date},
            author = ${post.user || post.author || 'Unknown Author'};
          `;
        })
    );

    console.log(`Seeded ${insertedPosts.length} posts`);

    return {
      createTable,
      posts: insertedPosts,
    };
  } catch (error) {
    console.error("Error seeding posts:", error);
    throw error;
  }
}

async function main() {
  try {
    const client = await db.connect();
    await seedPosts(client);
    await client.end();
    console.log("Database seeding completed successfully");
  } catch (error) {
    console.error("An error occurred while seeding the database:", error);
  }
}

main();