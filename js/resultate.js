import { supa } from '/js/supabase.js'; // Make sure to import your Supabase client

async function fetchAndDisplayLatestPost() {
  try {
    // Fetch posts and sort by "created_at" in ascending order
    const { data, error } = await supa.from('post').select('photo_url').order('created_at', { ascending: true }).limit(1);

    if (error) {
      throw error;
    }

    // Check if there is a post
    if (data && data.length > 0) {
      const latestPost = data[0];
      const photoUrl = latestPost.photo_url;

      // Get the public URL for the image using Supabase storage
      const bucketName = 'avatars'; // Replace with your bucket name
      const folderName = 'bilder'; // Replace with your folder name

      const cleanPhotoUrl = photoUrl.replace('avatars/bilder/', '');

      const { publicURL, urlError } = await supa.storage.from(bucketName).getPublicUrl(`${folderName}/${cleanPhotoUrl}`);

      if (urlError) {
        throw urlError;
      }

      // Create an image element and set its properties
      const imgElement = document.createElement('img');
      imgElement.id = 'locationimg';
      imgElement.src = publicURL; // Use the public image URL

      // Get the postContainer div and append the image to it
      const postContainer = document.getElementById('postContainer');
      postContainer.appendChild(imgElement);
    } else {
      // Handle case when there are no posts
      console.log('No posts found');
    }
  } catch (error) {
    console.error('Error fetching and displaying the latest post:', error);
  }
}

// Call the function to fetch and display the latest post
fetchAndDisplayLatestPost();
