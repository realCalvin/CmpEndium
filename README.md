[![CircleCI](https://circleci.com/gh/RTX-Banana/DummyTHICCC.svg?style=svg)](https://app.circleci.com/pipelines/github/RTX-Banana/DummyTHICCC)
# Get Started for Development
1. Run ```npm install``` in backendium and frontendium.
2. Create file called ```.env``` in backendium.
3. Add the following to the .env file. Replace content with the Mongo Atlas Client URI, AWS access key, and secret access key without quotes.
   ```
   MONGO_URI="PASTE MONGO DB CLUSTER HERE"
   AWS_S3_ACCESS_KEY_ID=ACCESS_KEY
   AWS_S3_SECRET_ACCESS_KEY=SECRET_ACCESS_KEY
   ```
4. Create file called ```credentials``` with no extension in ```C:\Users\USER_NAME\.aws```.
5. Add the following to the credentials file. Replace ACCESS_KEY and SECRET_ACCESS_KEY with the AWS access key and secret access key without quotes.
   ```
   [default]
   aws_access_key_id=ACCESS_KEY
   aws_secret_access_key=SECRET_ACCESS_KEY
   ```
6. Navigate to frontendium and run ```npm run dev```.