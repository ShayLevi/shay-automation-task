# shay-automation-task

This project is the automation home assignment - https://docs.google.com/document/d/1ixrNCz_rgYYVfeGnUi9ZnBL-OUsqvsP4IaxIAuguRWk/edit

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 18.x or later)
- pnpm (version 8.x or later)
- Install Playwright:
  pnpm exec playwright install
- Access to Cloudinary account credentials

## Setup

1. **Clone this Repository**
2. Install the project dependencies using pnpm:
pnpm install
3. Create a .env file in the root directory of the project and add your Cloudinary credentials:

    EMAIL=your-email

    PASSWORD=your-password

    **Make sure to replace your-email and your-password with your actual Cloudinary credentials**
4. Make sure to replace filePath to a path of an asset from your PC:

    const filePath = path.resolve('<your_image_path_source>');

5. To run the tests, use the following command:
   pnpm run test
