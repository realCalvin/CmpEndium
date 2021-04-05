# Get Started for Development
1. Run ```npm install``` in backendium and frontendium.
2. Create file called ```.env``` in backendium.
3. Add the following ```MONGO_URI="PASTE MONGO DB CLUSTER HERE"``` to the .env file. Replace content with the Mongo Atlas Client URI.
4. Create file called ```credentials``` with no extension in ```C:\Users\USER_NAME\.aws```.
5. Add the following to the credentials file. Replace ACCESS_KEY and SECRET_ACCESS_KEY with the access key and secret access key without quotes.
   ```
   [default]
   aws_access_key_id=ACCESS_KEY
   aws_secret_access_key=SECRET_ACCESS_KEY
   ```
6. Navigate to frontendium and run ```npm run dev```.

