/* eslint no-console: 0 */
/* eslint import/no-extraneous-dependencies: 0 */

const AWS = require('aws-sdk'); // imports AWS SDK
const mime = require('mime-types'); // mime type resolver
const fs = require('fs'); // utility from node.js to interact with the file system
const path = require('path'); // utility from node.js to manage file/folder paths

const MIME_TYPE_TARGET_DIRECTORIES = {
  'application/javascript': 'js',
  'text/css': 'css'
};

// configuration necessary for this script to run
const config = {
  s3BucketName: process.env.S3_BUCKET_NAME || 'assets-staging.msclvr.co/native',
  folderPath: process.env.RELATIVE_SOURCE_PATH || '../build' // path relative script's location
};

// See: https://aws.amazon.com/sdk-for-node-js/ for auth instructions
// initialise S3 client
const s3 = new AWS.S3({
  signatureVersion: 'v4'
});

// resolve full folder path
const distFolderPath = path.join(__dirname, config.folderPath);

// Recurse into a directory, executing callback for each file.
function walk(rootdir, callback, subdir) {
  // is sub-directory
  const isSubdir = !!subdir;
  // absolute path
  const abspath = isSubdir ? path.join(rootdir, subdir) : rootdir;

  // read all files in the current directory
  const filenames = fs.readdirSync(abspath);
  filenames.forEach(async filename => {
    // full file path
    const filepath = path.join(abspath, filename);
    const stat = fs.statSync(filepath);
    // check if current path is a directory
    if (stat.isDirectory()) {
      walk(rootdir, callback, path.join(subdir || '', filename || ''));
    } else {
      fs.readFile(filepath, (error, fileContent) => {
        // if unable to read file contents, throw exception
        if (error) {
          throw error;
        }

        // map the current file with the respective MIME type
        const mimeType = mime.lookup(filepath);

        let targetDirectory;
        if ((targetDirectory = MIME_TYPE_TARGET_DIRECTORIES[mimeType])) {
          const bucketPath = `${config.s3BucketName}/${targetDirectory}`;

          // build S3 PUT object request
          const s3Obj = {
            Bucket: bucketPath,
            Key: filename,
            Body: fileContent,
            ACL: 'public-read',
            ContentType: mimeType
          };

          const targetPath = `${bucketPath}/${filename}`;
          // upload file to S3
          s3.putObject(s3Obj, (err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(
                `Successfully uploaded '${filepath}' to '${targetPath}' with MIME type '${mimeType}'`
              );
            }
          });
        } else {
          console.log(`Skipping '${filepath}' with non-configured MIME type '${mimeType}'`);
        }
      });
    }
  });
}

// start upload process
walk(distFolderPath, (filepath, rootdir, subdir, filename) => {
  console.log('Filepath', filepath);
});
