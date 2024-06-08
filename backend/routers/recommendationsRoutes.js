import expressAsyncHandler from 'express-async-handler';
import express from 'express';
import Recommendation from '../models/recommendationModel.js';

const recommendationRouter = express.Router();

recommendationRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const recommendations = Recommendation.find({});
    if (recommendations) {
      res.send(recommendations);
    } else {
      res.status(404).send('Recommendations not found');
    }
  })
);

export default recommendationRouter;
