import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import Link from "next/link";




export default async function DataBase({ searchParams}) {
const { userId } = auth();
const profileRes =
    await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}`;

  let sortOrder = "DESC"; 
  if (searchParams.sort === "desc") {
      sortOrder = "ASC";
  }

  const dbAlbums = await sql.query(`SELECT * FROM reviews WHERE user_id = $1 ORDER BY album_score ${sortOrder}`, [userId]);

    return (
        <div>
        <button className="saved-albums-button">
        <Link href="/searchalbums" className="saved-albums-link">Add a Review</Link>
        </button>
        <br />
        <br /> 
        <div className="albumsContainer">
            <button className="saved-albums-button">
            <Link href="/?sort=asc" className="saved-albums-link">Sort By Highest Rating</Link>
            </button>
            <br />
            <br />  
            <button className="saved-albums-button">
            <Link href="/?sort=desc" className="saved-albums-link">Sort By Lowest Rating</Link>
            </button>
          <br />
          <br />
          <br />
          <br />
            <div className="albumGrid">
                {dbAlbums.rows.map((dbAlbum) => {
                    return (
                        <div className="albumContainer" key={dbAlbum.album_id}>
                            <div className="albumImage" style={{ backgroundImage: `url(${dbAlbum.album_image_url})` }}></div>
                            <div className="albumInfo">
                                <h3><Link href={`/profiles/${profileRes.rows[0].id}/posts/${dbAlbum.id}`} >{dbAlbum.album_name}</Link></h3>
                                <p>Artist: <strong>{dbAlbum.album_artist}</strong></p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
    );
}