FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY . .

# Expose port 3000 to the host network
EXPOSE 3000

# Start command
CMD [ "npm", "start" ]
