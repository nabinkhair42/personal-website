import mongoose, { Document, Schema } from "mongoose";

export interface IBlogMetrics extends Document {
  slug: string;
  views: number;
  lastViewed: Date;
  reactions: Map<string, number>;
  ip: string;
}

const blogMetricsSchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  views: {
    type: Number,
    default: 0,
  },
  lastViewed: {
    type: Date,
    default: Date.now,
  },
  reactions: {
    type: Map,
    of: Number,
    default: new Map(),
  }
}, {
  timestamps: true,
});

// Drop existing indexes and create new ones when the model is compiled
if (mongoose.models.BlogMetrics) {
  delete mongoose.models.BlogMetrics;
}

const BlogMetrics = mongoose.model<IBlogMetrics>('BlogMetrics', blogMetricsSchema);

// Ensure indexes are created/updated
BlogMetrics.syncIndexes();

export { BlogMetrics };
