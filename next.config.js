/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  images: {
      domains: [
        'res.cloudinary.com', 
        'avatars.githubusercontent.com',
        'lh3.googleusercontent.com'
        /* Add image provider as needed */
      ]
  }
}