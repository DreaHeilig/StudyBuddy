import { supa } from '/js/supabase.js';

let currentPostIndex = 0; // Initialize the index of the currently displayed post

async function fetchAndDisplayPost(index) {
  try {
    // Fetch posts and sort by "created_at" in ascending order
    const { data, error } = await supa.from('post').select('photo_url').order('created_at', { ascending: true });

    if (error) {
      throw error;
    }

    // Check if there are posts
    if (data && data.length > 0) {
      const post = data[index];
      if (post) {
        const photoUrl = post.photo_url;

        // Get the public URL for the image using Supabase storage
        const bucketName = 'avatars';
        const folderName = 'bilder';

        const cleanPhotoUrl = photoUrl.replace('avatars/bilder/', '');

        const { publicURL, urlError } = await supa.storage.from(bucketName).getPublicUrl(`${folderName}/${cleanPhotoUrl}`);

        if (urlError) {
          throw urlError;
        }

        // Create an image element and set its properties
        const imgElement = document.createElement('img');
        imgElement.id = 'locationimg';
        imgElement.src = publicURL;

        // Get the postContainer div and replace the image in it
        const postContainer = document.getElementById('postContainer');
        postContainer.innerHTML = ''; // Clear the previous content
        postContainer.appendChild(imgElement);
      } else {
        // Handle case when there are no more posts
        console.log('No more posts to display');
      }
    } else {
      // Handle case when there are no posts
      console.log('No posts found');
    }
  } catch (error) {
    console.error('Error fetching and displaying the post:', error);
  }
}

// Call the function to fetch and display the initial post
fetchAndDisplayPost(currentPostIndex);

// Add a click event listener to the "swipeLeft" button
const swipeLeftButton = document.getElementById('swipeLeft');
swipeLeftButton.addEventListener('click', () => {
  currentPostIndex++; // Move to the next post
  fetchAndDisplayPost(currentPostIndex);
});
