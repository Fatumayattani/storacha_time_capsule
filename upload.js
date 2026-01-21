import { create } from '@storacha/client';
import { filesFromPaths } from 'files-from-path';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function uploadTimeCapsule() {
  let client;
  try {
    // 1. Initialize the client
    client = await create();
    console.log('Client initialized.');

    // 2. Login with your email
    //    REPLACE with your email. Check your inbox for the verification link!
    const yourEmail = '<your_email>@gmail.com';
    console.log(`Attempting login for: ${yourEmail}`);
    await client.login(yourEmail); // <-- This line triggers the email verification
    console.log('✅ Login successful. Please check your email and click the verification link if you haven\'t already.');

    // 3. List available spaces and set the current one
    //    First, list spaces to see what's available
    const spaces = await client.spaces();
    console.log(`Available Spaces: ${spaces.map(s => s.did()).join(', ')}`);

    if (spaces.length === 0) {
      throw new Error('No Spaces found. Please create one first with `storacha space create` in the CLI.');
    }

    // Use the first space or a specific one by its DID
    const targetSpace = spaces[0];
    await client.setCurrentSpace(targetSpace.did());
    console.log(`✅ Current Space set to: ${targetSpace.did()}`);

    // 4. Prepare file paths RELATIVE TO THIS SCRIPT
    const projectRoot = __dirname;
    const capsuleFiles = [
      'index.html',
      'capsule.json',
      'message.md'
      // Add other files like 'assets/photo.jpg' if needed
    ].map(file => path.join(projectRoot, file));

    console.log('Looking for files at:', capsuleFiles);

    // 5. Create File objects from paths
    const fileObjects = [];
    for (const filePath of capsuleFiles) {
      try {
        const name = path.relative(projectRoot, filePath);
        const content = await fs.readFile(filePath);
        fileObjects.push(new File([content], name));
        console.log(`✓ Added: ${name}`);
      } catch (err) {
        console.warn(`⚠ Could not read file ${filePath}:`, err.message);
      }
    }

    if (fileObjects.length === 0) {
      throw new Error('No valid files found to upload.');
    }

    // 6. Upload the directory
    console.log('🚀 Uploading to Storacha...');
    const directoryCid = await client.uploadDirectory(fileObjects);
    
    // 7. Success!
    console.log('\n===================================');
    console.log('✅ TIME CAPSULE UPLOADED SUCCESSFULLY!');
    console.log('===================================');
    console.log(`📦 Content CID (Root): ${directoryCid}`);
    console.log(`🔗 Gateway URL: https://${directoryCid}.ipfs.storacha.link`);
    console.log(`🌐 View your capsule: https://${directoryCid}.ipfs.storacha.link/index.html`);
    console.log('===================================\n');

    // Save the CID
    await fs.writeFile(path.join(__dirname, 'uploaded-cid.txt'), directoryCid);
    return { cid: directoryCid };

  } catch (error) {
    console.error('\n❌ Upload failed:');
    console.error(error);

    // Provide hints for common errors
    if (error.message.includes('403') || error.message.includes('not authorized')) {
      console.log('\n💡 Hint: This often means the client is not properly logged in or the Space is not set.');
      console.log('   - Did you click the verification link sent to your email?');
      console.log('   - You can also try logging in with the CLI first: `storacha login <email>`');
    }
    if (error.message.includes('404')) {
      console.log('\n💡 Hint: A 404 can mean the service endpoint was not found.');
      console.log('   - Ensure your network allows connections to Storacha services.');
      console.log('   - Check for typos in your script or configuration.');
    }
    throw error; // Re-throw after logging
  }
}

// Run the function if this script is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  uploadTimeCapsule();
}

export { uploadTimeCapsule };