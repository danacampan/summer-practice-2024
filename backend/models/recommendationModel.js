import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
});

const recommendationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  message: { type: String, required: true },
  place: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  likes: { type: Number, required: true },
  comments: [commentSchema],
});

const Recommendation = new mongoose.model(
  'Recommendation',
  recommendationSchema
);
export default Recommendation;
