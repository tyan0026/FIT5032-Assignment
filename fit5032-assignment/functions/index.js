const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin:true})

admin.initializeApp();
const db = admin.firestore();

// Cloud Function to calculate average rating whenever a user rating is updated
exports.calculateAverageRating = functions.firestore
  .document('users/{userId}')
  .onWrite(async (change, context) => {
    // Read all user ratings
    const usersSnapshot = await db.collection('users').get();

    let totalRatings = 0;
    let ratingCount = 0;

    usersSnapshot.forEach(doc => {
      const userData = doc.data();
      if (userData.rating !== undefined) {
        totalRatings += userData.rating;
        ratingCount++;
      }
    });

    const averageRating = ratingCount > 0 ? totalRatings / ratingCount : 0;

    // Update the average rating in a separate document (e.g., in 'metadata' collection)
    await db.collection('metadata').doc('ratings').set({ averageRating });

    console.log(`Average rating updated: ${averageRating}`);

    return null;
  });