import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export default async function EditPost({ params }) {
  const { userId } = auth();


  const post = await sql`SELECT * FROM posts WHERE id = ${params.postid}`;

  async function handleEditPost(formData) {
    "use server";

    const title = formData.get("title");
    const content = formData.get("content");

    await sql`UPDATE posts SET title = ${title}, content = ${content} WHERE user_id = ${userId}`;
    revalidatePath(`/profiles/${params.profileId}/posts/${params.postid}`);
    revalidatePath(`/profiles/${params.profileId}/posts/${params.postid}/edit`);
    redirect(`/profiles/${params.profileId}/posts/${params.postid}`);
  }


if(userId !== post.rows[0].user_id) {
  return <p>404 not found</p>
}

  return (
    <div>
      <h2>Edit Post</h2>
      <form action={handleEditPost}>
        <h4>Edit - {post.rows[0].title}</h4>
        <input
          name="title"
          placeholder="Post Title"
          defaultValue={post.rows[0].title}
        />
        <textarea
          name="content"
          placeholder="Post content"
          defaultValue={post.rows[0].content}
        ></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
}