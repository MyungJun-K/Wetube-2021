import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, require: true, trim: true, max: 80 },
  fileUrl: { type: String, required: true },
  description: { type: String, require: true, trim: true, min: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, required: true, trim: true }],
  meta: {
    views: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
}); // Video 정보를 저장하는 내용

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
}); // 개발자가 직접 함수 생성

const Video = mongoose.model("Video", videoSchema); // mongodb에 연결
export default Video;
