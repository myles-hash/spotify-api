'use server';
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export async function handleAddToDB( album, formData, fav_track ) {
    const { userId } = auth();

    const profileRes =
    await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}`;

    const album_score = formData.album_score;
    const album_review = formData.album_review;


    await sql`INSERT INTO reviews (album_id, album_image_url, album_name, spotify_link, album_artist, album_score, album_review, fav_track, user_id) 
    VALUES (${album.id}, ${album.images[0].url}, ${album.name}, ${album.external_urls.spotify}, ${album.artists[0].name}, ${album_score},${album_review},${fav_track}, ${userId})`;
    revalidatePath(`/profiles/${profileRes.rows[0].id}/posts`);
    redirect(`/profiles/${profileRes.rows[0].id}/posts`);
}

    
