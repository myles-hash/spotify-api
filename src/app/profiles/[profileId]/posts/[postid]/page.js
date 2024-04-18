import CreateCommentBtn from "@/app/comps/CreateCommentButton";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import Link from "next/link";


export default async function SinglePost({ params }) {
    const {userId} = auth();
    
    const review = await sql`SELECT * FROM reviews WHERE id = ${params.postid}`;


    const comments = await sql`SELECT * FROM comments where review_id = ${params.postid} ORDER BY id asc`;

    const currentUsername = await sql`SELECT username FROM profiles where clerk_user_id = ${userId} `;


    

    async function handleAddComment(formData) {
        "use server";
        const username = formData.get("username");
        const content = formData.get("content");
    
        await sql`INSERT INTO comments (username, content, review_id, user_id) VALUES (${username}, ${content}, ${params.postid}, ${userId})`;
        revalidatePath(`/${params.postid}`);
        }
    
  
        return (
          <>
          <div className="albumGrid">
              {review.rows.map((dbAlbum) => (
                  <div className="albumContainer" key={dbAlbum.album_id}>
                      <div className="albumImage" style={{ backgroundImage: `url(${dbAlbum.album_image_url})` }}></div>
                      <div className="albumInfo">
                          <h3>{dbAlbum.album_name}</h3>
                          <Link href={dbAlbum.spotify_link} target='_blank' className="link play-album-link"><strong>PLAY</strong></Link>
                          <p>Artist: <strong>{dbAlbum.album_artist}</strong></p>
                          <p>Score: <strong>{dbAlbum.album_score} / 5</strong></p>
                          <p>Review: <strong>{dbAlbum.album_review}</strong></p>
                          <p>Favourite Track: <strong>{dbAlbum.fav_track}</strong></p>
                      </div>
                  </div>
              ))}
          </div>
          <div>
          <form action={handleAddComment}>
            <h4>Add a comment</h4>
            <input name="username" placeholder="Username" defaultValue={currentUsername.rows[0].username} value={currentUsername.rows[0].username} readOnly/>
             <textarea name="content" placeholder="Content"></textarea>
             <CreateCommentBtn />
         </form>
         <h2>Comments</h2>
         {comments.rows.map((comment) => {
        return (
          <div key={comment.id}>
            <h3>{comment.username}</h3>
            <p>{comment.content}</p>
            <p>
            {userId === comment.user_id && <Link href={`/profiles/${params.profileId}/posts/${params.postid}/comments/${comment.id}/edit`}>
              Edit
            </Link>}</p>
          </div>
        );
      })}
      </div>
    </>
  )
}